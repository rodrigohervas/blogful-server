const express = require('express')
const ArticlesService = require('./articles.service')

const articlesRouter = express.Router();

articlesRouter
    .route('/')
    .get(ArticlesService.getAll)
    .post(ArticlesService.post)

articlesRouter
    .route('/:id')
    .get(ArticlesService.getById)
    .put(ArticlesService.putById)
    .patch(ArticlesService.patchById)
    .delete(ArticlesService.deleteById)

module.exports = articlesRouter