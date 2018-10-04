const Validator = require('validator');
const isEmpty = require('./is-empty');

const keys = require('../config/key');
const message = require('../utils/message');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min: keys.MIN_CHARACTER, max: keys.MAX_CHARACTER})) {
        errors.name = message.VALIDATE_MESSAGE.USER.NAME_IS_LENGTH;
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = message.VALIDATE_MESSAGE.USER.NAME_EMPTY;
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_INVALID;
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_EMPTY;
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = message.VALIDATE_MESSAGE.USER.PASSWORD_EMPTY;
    }

    if(!Validator.isLength(data.password, {min: keys.MIN_CHARACTER, max: keys.MAX_CHARACTER})) {
        errors.password = message.VALIDATE_MESSAGE.USER.PASSWORD_IS_LENGTH;
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = message.VALIDATE_MESSAGE.USER.CONFIRM_PASSWORD_EMPTY;
    }
    else {
        if(!Validator.equals(data.password, data.password2)) {
            errors.password2 = message.VALIDATE_MESSAGE.USER.CONFIRM_PASSWORD_NOT_MATCH;
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}