const Validator = require('validator');
const isEmpty = require('./is-empty');

const message = require('../utils/message');
const keys = require('../config/key');
module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!Validator.isLength(data.handle, {min: keys.MIN_CHARACTER, max: keys.MAX_CHARACTER})) {
        errors.handle = message.VALIDATE_MESSAGE.PROFILE.HANDLE_IS_LENGTH;
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = message.VALIDATE_MESSAGE.PROFILE.HANDLE_EMPTY;
    }

    if(Validator.isEmpty(data.status)) {
        errors.status = message.VALIDATE_MESSAGE.PROFILE.STATUS_EMPTY;
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = message.VALIDATE_MESSAGE.PROFILE.SKILLS_EMPTY;
    }

    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    if(!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    if(!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}