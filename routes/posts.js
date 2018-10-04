const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controller/post.controller');

module.exports = function() {
    router.post('/', passport.authenticate('jwt', { session: false }), postController.createPost);
    router.get('/',  postController.getAllPost);
    router.get('/:id',  postController.getPostByID);
    router.delete('/:id',passport.authenticate('jwt', { session: false }), postController.deletePostByID);
    router.post('/like/:id',passport.authenticate('jwt', { session: false }), postController.likePost);
    router.post('/unlike/:id',passport.authenticate('jwt', { session: false }), postController.unlikePost);
    router.post('/comment/:id',passport.authenticate('jwt', { session: false }), postController.addCommentToPost);
    router.delete('/comment/:id/:comment_id',passport.authenticate('jwt', { session: false }), postController.deleteComment);
    
    return router;
}