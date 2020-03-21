const express = require('express')
const CommentsService = require('./comments.service')

const commentsRouter = express.Router();

commentsRouter
    .route('/')
    .get(CommentsService.getAll)
    .post(CommentsService.post)

commentsRouter
    .route('/:id')
    .get(CommentsService.getById)
    .put(CommentsService.putById)
    .patch(CommentsService.patchById)
    .delete(CommentsService.deleteById)

module.exports = commentsRouter