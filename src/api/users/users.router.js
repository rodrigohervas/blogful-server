const express = require('express')
const UsersService = require('./users.service')

const usersRouter = express.Router();

usersRouter
    .route('/')
    .get(UsersService.getAll)
    .post(UsersService.post)

usersRouter
    .route('/:id')
    .get(UsersService.getById)
    .put(UsersService.putById)
    .patch(UsersService.patchById)
    .delete(UsersService.deleteById)

module.exports = usersRouter