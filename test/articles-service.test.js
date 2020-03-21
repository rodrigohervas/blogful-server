const config = require('../src/config')
const knex = require('knex')
const app = require('../src/app')
const db = require('../src/knexContext')
const { generateTestArticlesData } = require('./articles.testData')
const { generateTestUsersData } = require('./users.testData')

const testArticles = generateTestArticlesData()
const testUsers = generateTestUsersData()
        
// The db test connection is imported from ./src/knexContext.js; 
// and the TEST_DB_URL is assigned in knexContext by setting, 
// in ./test/setup.js, the var process.env.NODE_ENV to 'test'

//empty all test tables before each test runs
beforeEach('empty the tables', () => db.raw('TRUNCATE blogful_articles, blogful_users, blogful_comments RESTART IDENTITY CASCADE') )

//empty all test tables after each test has run
afterEach('truncate tables', () => {
    db.raw('TRUNCATE blogful_articles RESTART IDENTITY CASCADE')
    db.raw('TRUNCATE blogful_users RESTART IDENTITY CASCADE')
    db.raw('TRUNCATE blogful_comments RESTART IDENTITY CASCADE')
})

//after all the tests have run close all connections in the connection pool
after('disconnect from the test db', () => {
    db.destroy()
})

describe('GET /api/articles', () => {
    
    context(`blogful_articles has data`, () => {
        
        beforeEach('insert test articles', () => {
            return db
                    .insert(testUsers)
                    .into('blogful_users')
                    .then( () => {
                        return db
                                .insert(testArticles)
                                .into('blogful_articles')
                    })
        })
        
        it('GET /articles responds with 200 and all of the articles', () => {
            return supertest(app)
                    .get('/api/articles')
                    .expect(200, testArticles)
        })

        it('GET /articles/:article_id responds with 200 and the specified article', () => {
            const id = 2
            return supertest(app)
                    .get(`/api/articles/${id}`)
                    .expect(200, testArticles[id - 1])
        })
    })

    context('Given an XSS attack article', () => {
        const maliciousArticle = {
            id: 911,
            title: 'Naughty naughty very naughty <script>alert(\"xss\");</script>',
            style: 'How-to',
            content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
        }
        
        beforeEach(`insert malicious article into table 'blogful_articles'`, () => {
            return db
                    .insert(testUsers)
                    .into('blogful_users')
                    .then( () => {
                        return db
                                .insert(maliciousArticle)
                                .into('blogful_articles')
                    })
        })

        it(`removes XSS attack content`, () => {
            return supertest(app)
                    .get(`/api/articles/${maliciousArticle.id}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.title).to.eql('Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;')
                        expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
                    })
                    .catch( error => {
                        throw('Error: ', error)
                    })
        })
    })

    context(`blogful_articles has NO data`, () => {
        
        it('GET /articles responds with 200 and no articles', () => {
            return supertest(app)
                    .get('/api/articles')
                    .expect(200, [])
        })

        it('GET /articles/:article_id responds with 404 not found', () => {
            const id = 654654654
            return supertest(app)
                    .get(`/api/articles/${id}`)
                    .expect(404)
                    .expect(res => {
                        const error = res.body.error
                        expect(error.message).to.eql('error getting article')
                    })
        })
    })
})

describe('POST /api/articles', () => {

    beforeEach('insert test users', () => {
        return db
                .insert(testUsers)
                .into('blogful_users')
    })

    it('creates an article, responding with 201 and the new article', () => {
        const article = {
            title: 'title',
            content: 'content',
            style: 'News', 
            author: 3
        }
        return supertest(app)
                .post('/api/articles')
                .set('content-type', 'application/json')
                .send(article)
                .expect(201)
                .expect( res => {
                    expect(res.body.title).to.eql(article.title)
                    expect(res.body.style).to.eql(article.style)
                    expect(res.body.content).to.eql(article.content)
                    expect(res.body.author).to.eql(article.author)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/articles/${res.body.id}`)
                    const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' }) //force timezone for Windows
                    const actualDate = new Date(res.body.date_published).toLocaleString()
                    expect(actualDate).to.eql(expectedDate)
                })
                .catch( error => {
                    throw('Error: ', error)
                })
    })

    it('responds with 400 and an error message when the title is missing', () => {
        const article = {
            //title: 'title',
            content: 'content',
            style: 'News', 
            author: 2
        }
        return supertest(app)
                .post('/api/articles')
                .send(article)
                .expect(400)
                .expect(res => {
                    const responseError = res.body.error
                    expect(responseError.message).to.eql('title is mandatory')
                    expect(responseError.status).to.eql('400')
                })
                .catch(error => {
                    throw('Error: ', error)
                })
    })
})

describe('PATCH /api/articles/', () => {
    context(`Given that there's data in the DB`, () => {
        
        beforeEach('insert test data', () => {
            return db
                    .insert(testUsers)
                    .into('blogful_users')
                    .then(() => {
                        return db
                                .into('blogful_articles')
                                .insert(testArticles)
                    })
        })

        it(`updates the article and responds with 204`, () => {
            const updateId = 1
            const articleToUpdate = {
                id: updateId,
                title: 'Updated title', 
                content: 'updated content', 
                style: 'News' ,
                date_published: testArticles[updateId - 1].date_published, 
                author: 2
            }
            return supertest(app)
                    .patch(`/api/articles/${updateId}`)
                    .send(articleToUpdate)
                    .expect(204)
                    .then( () =>
                        supertest(app)
                            .get(`/api/articles/${updateId}`)
                            .then( res => {
                                const article = res.body
                                expect(article).to.eql(articleToUpdate)
                            })
                    )
        })
    })

    context(`Given that there's NO data in the DB`, () => {
        it(`responds with 404`, () => {
            articleId = 65465
            return supertest(app)
                    .patch(`/api/articles/${articleId}`)
                    .send('id', articleId)
                    .expect(res => {
                        const error = res.body.error
                        expect(404)
                        expect(error.message).to.eql('Empty update request')
                    })
        })
    })
})

describe('DELETE /api/articles', () => {

    context(`Given that there's data in the DB`, () => {
        
        beforeEach('insert test data', () => {
            return db
                    .insert(testUsers)
                    .into('blogful_users')
                    .then(() => {
                        return db
                                .into('blogful_articles')
                                .insert(testArticles)
                    })
        })

        it(`deletes an article, responds with 200 and '1 article/s deleted' message`, () => {
            const articleId = 1
            const expectedArticles = testArticles.filter(article => article.id !== articleId)
            return supertest(app)
                    .delete(`/api/articles/${articleId}`)
                    .expect(200)
                    .expect( res => {
                        const message = res.body
                        expect(message).to.eql('1 article/s deleted')
                        supertest(app)
                            .get('/api/articles')
                            .expect(expectedArticles)
                    })
                    .catch( error => {
                        throw('Error: ', error)
                    })
        })
    })

    context(`Given that there's NO data in the DB`, () => {
        it(`responds with 404 and 'error deleting article' message`, () => {
            const articleId = 654654654
            return supertest(app)
                    .delete(`/api/articles/${articleId}`)
                    .expect(404)
                    .expect( res => {
                        const error = res.body.error
                        expect(error.message).to.eql(`error deleting article`)
                    })
        })
    })

})