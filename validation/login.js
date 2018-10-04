const Validator = require('validator');
const isEmpty = require('./is-empty');
const message = require('../utils/message');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_INVALID;
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_EMPTY;
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = message.VALIDATE_MESSAGE.USER.PASSWORD_EMPTY;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}