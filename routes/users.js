const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/user.controller');

module.exports = function() {
    router.post('/register', userController.register);
    router.post('/login', userController.login);
    router.get('/current', passport.authenticate('jwt', { session: false }), userController.current);
    return router;
}