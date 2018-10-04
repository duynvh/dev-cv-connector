const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../controller/profile.controller');

module.exports = function() {
    router.get('/', passport.authenticate('jwt', { session: false }), profileController.getCurrentUserProfile);
    router.get('/all',  profileController.getAllProfile);
    router.get('/handle/:handle', profileController.getProfileByHandle);
    router.get('/user/:user_id', profileController.getProfileByUserId);
    router.post('/', passport.authenticate('jwt', { session: false }), profileController.createOrEditProfile);
    router.post('/experience', passport.authenticate('jwt', { session: false }), profileController.addExperienceToProfile);
    router.post('/education', passport.authenticate('jwt', { session: false }), profileController.addEducationToProfile);
    router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), profileController.deleteExperience);
    router.delete('education/:edu_id', passport.authenticate('jwt', { session: false }), profileController.deleteEducation);
    router.delete('/', passport.authenticate('jwt', { session: false }), profileController.deleteUserAndProfile);
    return router;
}