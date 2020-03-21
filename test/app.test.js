const app = require('../src/app')

describe('GET /api/', () => {
    it('GET/ responds with 200 ,and message "Welcome to Blogful API"', () => {
        return supertest(app)
                .get('/api/')
                .expect(200, '"Welcome to Blogful API"')
    })
})