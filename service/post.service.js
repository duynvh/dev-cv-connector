const Post = require('../models/post.model');
const Profile = require('../models/profile.model');
const message = require('../utils/message');
const keys = require('../config/key');

// Load input validation
const validatePostInput = require('../validation/post');

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

function getAllPost() {
    return new Promise((res, rej) => {
        let errors = {};
        Post.find()
        .sort({date: -1})
        .then(posts => {
            if(posts) {
                res(posts)
            }
            else {
                errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND_BY_ID;
                rej({
                    statusCode: 400,
                    errors
                })
            }
        })
        .catch(err => {
            errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND;
            rej({
                statusCode: 400,
                errors
            })
        })
    });
}


function getPostByID(req) {
    return new Promise((res, rej) => {
        Post.findById(req.id)
        .then(post => {
            if(post) {
                res(post)
            }
            else {
                let errors = {};
                errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND_BY_ID;
                rej({
                    statusCode: 400,
                    errors
                })
            }
        })
    });
}

function createPost(req) {
    return new Promise((res, rej) => {
        const { errors, isValid } = validatePostInput(req);

        // Check Validation
        if (!isValid) {
        // If any errors, send 400 with errors object
            rej({
                statusCode: 400,
                errors
            })
        }

        const newPost = new Post({
            text: req.text,
            name: req.name,
            avatar: req.avatar,
            user: req.user
        });

        newPost.save().then(post => res(post));
    })
}

function deletePostByID(req) {
    return new Promise((res, rej) => {
        let errors = {};
        Profile.findOne({user: req.user})
        .then(profile => {
            Post.findById(req.id)
            .then(post => {
                if(post.user.toString() !== req.user) {
                    errors.notauthorized = message.ERROR_MESSAGE.AUTH.NOT_AUTHORIZED
                    rej({
                        status: 401,
                        errors
                    })
                }

                // Delete
                post.remove().then(() => res({success: true}));
            })
            .catch(err => {
                errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND;
                rej({
                    statusCode: 400,
                    errors
                })
            })
        })
    })
}

function likePost(req) {
    return new Promise((res, rej) => {
        let errors = {};

        Profile.findOne({user: req.user})
        .then(profile => {
            Post.findById(req.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() == req.user).length > 0) {
                    errors.alreadyliked = message.ERROR_MESSAGE.POST.ALREADY_LIKED;
                    rej({
                        statusCode: 400,
                        errors
                    })
                }

                post.likes.unshift({user: req.user});

                post.save().then(post => res(post));
            })
            .catch(err => {
                errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND;
                rej({
                    statusCode: 400,
                    errors
                })
            })
        })
    })
}

function unlikePost(req) {
    return new Promise((res, rej) => {
        let errors = {};

        Profile.findOne({user: req.user})
        .then(profile => {
            Post.findById(req.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() == req.user).length === 0) {
                    errors.notlike = message.ERROR_MESSAGE.POST.NOT_LIKE;
                    rej({
                        statusCode: 400,
                        errors
                    })
                }

                // Get remove index
                const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user);

                post.likes.splice(removeIndex, 1);

                post.save().then(post => res(post));
            })
            .catch(err => {
                errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND;
                rej({
                    statusCode: 400,
                    errors
                })
            })
        })
    })
}

function addCommentToPost(req) {
    return new Promise((res, rej) => {
        const { errors, isValid } = validatePostInput(req);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return rej({
                statusCode: 400,
                errors
            })
        }

        Post.findById(req.id)
        .then(post => {
            const newComment = {
                text: req.text,
                name: req.name,
                avatar: req.avatar,
                user: req.user
            };
      
            // Add to comments array
            post.comments.unshift(newComment);
      
            // Save
            post.save().then(post => res(post));
        })
        .catch(err => {
            errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND;
            rej({
                statusCode: 400,
                errors
            })
        });
    })
}

function deleteComment(req) {
    return new Promise((res, rej) => {
        let errors = {};

        Post.findById(req.id)
        .then(post => {
            if(post.comments.filter(comment => comment._id.toString() === req.comment_id).length === 0) {
                errors.commentnotexists = message.ERROR_MESSAGE.POST.COMMENT_NOT_EXISTS;
                rej({
                    statusCode: 400,
                    errors
                })
            }

            const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.comment_id);
        
            // Splice comment out of array
            post.comments.splice(removeIndex, 1);

            post.save().then(post => res(post));

        })
        .catch(err => {
            errors.nopostsfound = message.ERROR_MESSAGE.POST.NO_POST_FOUND;
            rej({
                statusCode: 400,
                errors
            })
        });
    })
}