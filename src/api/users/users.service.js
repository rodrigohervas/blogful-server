const db = require('../../knexContext')
const xss = require('xss')

const serializeUser = (user) => (
    {
        id: user.id,
        fullname: xss(user.fullname), 
        username: xss(user.username), 
        password: user.password, 
        nickname: xss(user.nickname), 
        date_created: user.date_created
    }
)

const UsersService = {

    getAll(req, res, next) {
        return db
                .select('*')
                .from('blogful_users')
                .then(users => {
                    res.status(200).json(users.map(user => serializeUser(user)))
                })
                .catch( error => {
                    next({
                        message: 'error getting users', 
                        status: error.status, 
                        loc: 'at users.service.getAll', 
                        internalMessage: error.message
                    })
                })
    },

    getById(req, res, next) {
        const id = req.params.id
        if(!id){
            throw( {message: 'id is mandatory', status: '400'} )
        }

        return db
                .select('*')
                .from('blogful_users')
                .where('id', id)
                .first()
                .then(user => {
                    if(!user) {
                        throw ( { message: `User doesn't exist`, status: 404 } )
                    }
                    res.status(200).json( serializeUser(user) )
                })
                .catch( error => {
                    next( {
                        message: 'error getting user', 
                        status: error.status, 
                        loc: 'at user.service.getById', 
                        internalMessage: error.message
                    } )
                }) 
    },

    post(req, res, next) {
        const newUser = req.body
        
        if(!newUser.fullname){
            throw( {message: 'fullname is mandatory', status: '400'} )
        }

        if(!newUser.username){
            throw( {message: 'username is mandatory', status: '400'} )
        }

        if(!newUser.password){
            throw( {message: 'password is mandatory', status: '400'} )
        }

        if(!newUser.nickname){
            throw( {message: 'nickname is mandatory', status: '400'} )
        }

        return db
                .insert(newUser)
                .into('blogful_users')
                .returning('*')
                .then(users => {
                    const user = users[0]
                    res.status(201)
                       .location(`${req.originalUrl}/${user.id}`)
                       .json(serializeUser(user))
                })
                .catch(error => {
                    next({
                        message: 'error creating user', 
                        status: error.status, 
                        loc: 'at users.service.post', 
                        internalMessage: error.message
                    })
                })
    }, 

    putById(req, res, next) {
        const id = req.params.id
        const user = req.body
        const date = new Date(user.date_created)
        user.date_created = date

        if(!user.id){
            throw( {message: 'id is mandatory', status: '400'} )
        }

        if(!user.fullname){
            throw( {message: 'fullname is mandatory', status: '400'} )
        }

        if(!user.username){
            throw( {message: 'username is mandatory', status: '400'} )
        }

        if(!user.password){
            throw( {message: 'password is mandatory', status: '400'} )
        }

        if(!user.nickname){
            throw( {message: 'nickname is mandatory', status: '400'} )
        }

        return db
                .update(user)
                .from('blogful_users')
                .where('id', id)              
                .returning('*')
                .then(user => {
                    if(!user){
                        throw ( { message: `User doesn't exist`, status: 404 } )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating user', 
                        status: error.status, 
                        loc: 'at user.service.putById', 
                        internalMessage: error.message
                    })
                )
    },

    patchById(req, res, next) {
        const id = req.params.id
        const user = req.body
        user.id = id
        if(user.date_created) {
            const date = new Date(user.date_created)
            user.date_created = date
        }

        if(!user.id){
            throw( {message: 'id is mandatory', status: '400'} )
        }

        if(!user.fullname && !user.username && !user.password && !user.nickname){
            throw( {message: 'request body must contain at least one value to update', status: '400'} )
        }

        return db
                .update(user)
                .from('blogful_users')
                .where('id', id)
                .returning('*')
                .then(user => {
                    if(!user){
                        throw ( { message: `User doesn't exist`, status: 404 } )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating user', 
                        status: error.status, 
                        loc: 'at user.service.patchById', 
                        internalMessage: error.message
                    })
                )
    },

    deleteById(req, res, next) {
        const id = req.params.id
        if(!id){
            throw( {message: 'id is mandatory', status: '400'} )
        }

        return db
                .del()
                .from('blogful_users')
                .where('id', id)
                .then(result => {
                    if(!result) {
                        throw ( {message: `User doesn't exist`, status: 404} )
                    }
                    res.status(200).json(`${result} user/s deleted`)
                })
                .catch ( error =>
                    next({
                        message: 'error deleting user', 
                        status: error.status, 
                        loc: 'at user.service.deleteById', 
                        internalMessage: error.message
                    })
                )
    }
}

module.exports = UsersService