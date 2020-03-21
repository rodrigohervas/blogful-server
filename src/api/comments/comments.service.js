const db = require('../../knexContext')
const xss = require('xss')

//id, text, date_commented, article_id, user_id
const serializeComment = (comment) => (
    {
        id: comment.id,
        text: xss(comment.text), 
        date_commented: comment.date_commented, 
        article_id: comment.article_id, 
        user_id: comment.user_id
    }
)

const CommentsService = {

    getAll(req, res, next) {
        return db
                .select('*')
                .from('blogful_comments')
                .then(comments => {
                    res.status(200).json(comments.map(comment => serializeComment(comment)))
                })
                .catch( error => {
                    next({
                        message: 'error getting comments', 
                        status: error.status, 
                        loc: 'at comments.service.getAll', 
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
                .from('blogful_comments')
                .where('id', id)
                .first()
                .then(comment => {
                    if(!comment) {
                        throw ( { message: `Comment doesn't exist`, status: 404 } )
                    }
                    res.status(200).json( serializeComment(comment) )
                })
                .catch( error => {
                    next( {
                        message: 'error getting comment', 
                        status: error.status, 
                        loc: 'at comments.service.getById', 
                        internalMessage: error.message
                    } )
                }) 
    },

    post(req, res, next) {
        const newComment = req.body
        
        if(!newComment.text){
            throw( {message: 'text is mandatory', status: '400'} )
        }

        if(!newComment.user_id){
            throw( {message: 'user id is mandatory', status: '400'} )
        }

        if(!newComment.article_id){
            throw( {message: 'article id is mandatory', status: '400'} )
        }        

        return db
                .insert(newComment)
                .into('blogful_comments')
                .returning('*')
                .then(comments => {
                    const comment = comments[0]
                    res.status(201)
                       .location(`${req.originalUrl}/${comment.id}`)
                       .json(serializeComment(comment))
                })
                .catch(error => {
                    next({
                        message: 'error creating comment', 
                        status: error.status, 
                        loc: 'at comments.service.post', 
                        internalMessage: error.message
                    })
                })
    }, 

    putById(req, res, next) {
        const id = req.params.id
        const comment = req.body
        if(comment.date_commented) {
            const date = new Date(comment.date_commented)
            comment.date_commented = date
        }

        if(!comment.text){
            throw( {message: 'text is mandatory', status: '400'} )
        }

        if(!comment.user_id){
            throw( {message: 'user id is mandatory', status: '400'} )
        }

        if(!comment.article_id){
            throw( {message: 'article id is mandatory', status: '400'} )
        } 

        return db
                .update(comment)
                .from('blogful_comments')
                .where('id', id)              
                .returning('*')
                .then(comment => {
                    if(!comment){
                        throw ( { message: `Comment doesn't exist`, status: 404 } )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating comment', 
                        status: error.status, 
                        loc: 'at comments.service.putById', 
                        internalMessage: error.message
                    })
                )
    },

    patchById(req, res, next) {
        const id = req.params.id
        const comment = req.body
        if(comment.date_commented) {
            const date = new Date(comment.date_commented)
            comment.date_commented = date
        }

        if(!comment.text && !comment.user_id && !comment.article_id){
            throw( {message: 'request body must contain at least one value to update', status: '400'} )
        }

        return db
                .update(comment)
                .from('blogful_comments')
                .where('id', id)              
                .returning('*')
                .then(comment => {
                    if(!comment){
                        throw ( { message: `Comment doesn't exist`, status: 404 } )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating comment', 
                        status: error.status, 
                        loc: 'at comments.service.putById', 
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
                .from('blogful_comments')
                .where('id', id)
                .then(result => {
                    if(!result) {
                        throw ( {message: `Comment doesn't exist`, status: 404} )
                    }
                    res.status(200).json(`${result} comment/s deleted`)
                })
                .catch ( error =>
                    next({
                        message: 'error deleting comment', 
                        status: error.status, 
                        loc: 'at comments.service.deleteById', 
                        internalMessage: error.message
                    })
                )
    }
}

module.exports = CommentsService