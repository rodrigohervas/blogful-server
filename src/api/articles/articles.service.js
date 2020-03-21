const db = require('../../knexContext')
const xss = require('xss')

const serializeArticle = (article) => (
    {
        id: article.id, 
        title: xss(article.title), 
        content: xss(article.content), 
        date_published: article.date_published, 
        style: article.style, 
        author: article.author
    }
)

const ArticlesService = {

    getAll(req, res, next) {
        return db
            .select('*')
            .from('blogful_articles')
            .then( articles => 
                res
                .status(200)
                .json(articles.map(serializeArticle)) 
            )
            .catch( error => 
                next({
                    message: 'error getting articles', 
                    status: error.status, 
                    loc: 'at article.service.getAll', 
                    internalMessage: error.message
                })
            )
    }, 
    
    post(req, res, next) {
        const article = req.body

        if(!article.title) {
            throw( {message: 'title is mandatory', status: '400'} )
        }

        if(!article.content) {
            throw( {message: 'content is mandatory', status: '400'} )
        }

        if(!article.style) {
            throw( {message: 'style is mandatory', status: '400'} )
        }

        if(!article.author) {
            throw( {message: 'author is mandatory', status: '400'} )
        }
        
        return db
            .insert(article)
            .into('blogful_articles')
            .returning('*')
            .then(articles => {
                const article = articles[0]
                res
                .status(201)
                .location(`${req.originalUrl}/${article.id}`)
                .json(serializeArticle(article))
            })
            .catch( error => {
                next({
                    message: 'error creating article', 
                    status: error.status,  
                    loc: 'at article.service.post', 
                    internalMessage: error.message
                })
            })
    }, 
    
    getById(req, res, next) {
        const id = req.params.id
        return db
            .select('*')
            .from('blogful_articles')
            .where('id', id)
            .first()
            .then(article => {
                if(!article) {
                    throw ( { message: `Article doesn't exist`, status: 404 } )
                }
                res.status(200).json( serializeArticle(article) )
            })
            .catch( error => {
                next( {
                    message: 'error getting article', 
                    status: error.status, 
                    loc: 'at article.service.getById', 
                    internalMessage: error.message
                } )
            })      
    }, 
    
    putById(req, res, next) {
        const id = req.params.id
        const article = req.body
        const date = article.date_published
        article.date_published = new Date(date)

        return db
            .from('blogful_articles')
            .where('id', id)
            .update(article)
            .returning('*')
            .then(articles => {
                if(!articles.length) {
                    throw ( { message: `Article doesn't exist`, status: 404 } )
                }
                const article = articles[0]
                res.status(204).end()
            })
            .catch( error => 
                next({
                    message: 'error updating article', 
                    status: error.status, 
                    loc: 'at article.service.putById', 
                    internalMessage: error.message
                })
            )
    },
    
    patchById(req, res, next) {
        const id = req.params.id
        const {title, content, style, author} = req.body
        const article = {
            title: title, 
            content: content, 
            style: style, 
            author: author
        }
        
        if(!title && !content && !style && !author) {
            throw ( { message: `Empty update request`, status: 404 } )
        }

        return db
            .from('blogful_articles')
            .where('id', id)
            .update(article)
            .returning('*')
            .then(articles => {
                if(!articles.length) {
                    throw ( { message: `Article doesn't exist`, status: 404 } )
                }
                res.status(204).end()
            })
            .catch( error => 
                next({
                    message: 'error updating article', 
                    status: error.status, 
                    loc: 'at article.service.patchById', 
                    internalMessage: error.message
                })
            )
    },
    
    deleteById(req, res, next) {
        const id = req.params.id
        return db
            .from('blogful_articles')
            .where('id', id)
            .del()
            .then(result => {
                if(!result) {
                    throw ( {message: `Article doesn't exist`, status: 404} )
                }
                res.status(200).json(`${result} article/s deleted`)
            })
            .catch ( error =>
                next({
                    message: 'error deleting article', 
                    status: error.status, 
                    loc: 'at article.service.deleteById', 
                    internalMessage: error.message
                })
            )
    }

}

module.exports = ArticlesService