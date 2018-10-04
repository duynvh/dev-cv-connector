const postService = require('../service/post.service');

module.exports = {
    getAllPost,
    getPostByID,
    createPost,
    deleteComment,
    deletePostByID,
    addCommentToPost,
    likePost,
    unlikePost
};

function getAllPost(req, res, next) {
    postService.getAllPost()
    .then(response => res.send(response))
    .catch(err => res.send(err));
}

function getPostByID(req, res, next) {
    const params = {
        id: req.params.id
    };

    postService.getPostByID(params)
    .then(response => res.send(response))
    .catch(err => res.send(err));
}

function createPost(req, res, next) {
    const params = {
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    };

    postService.createPost(params)
    .then(response => res.send(response))
    .catch(err => res.send(err));
}

function deletePostByID(req, res, next) {
    const params = {
        user: req.user.id,
        id: req.params.id
    };

    postService.deletePostByID(params)
    .then(response => res.send(response))
    .catch(err => res.send(err));
}

function likePost(req, res, next) {
    const params = {
        user: req.user.id,
        id: req.params.id
    };

    postService.likePost(params)
    .then(response => res.send(response))
    .catch(err => res.send(err));
}

function unlikePost(req, res, next) {
    const params = {
        user: req.user.id,
        id: req.params.id
    };

    postService.unlikePost(params)
    .then(response => res.send(response))
    .catch(err => res.send(err));
}

function addCommentToPost(req, res, next) {
    const params = {
        user: req.user.id,
        id: req.params.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
    };

    postService.addCommentToPost(params)
    .then(response => res.send(response))
    .catch(err => res.send(err));
}

function deleteComment(req, res, next) {
    const params = {
        user: req.user.id,
        id: req.params.id,
        comment_id: req.params.comment_id,
    };

    postService.deleteComment(params)
    .then(response => res.send(response))
    .catch(err => res.send(err));
}