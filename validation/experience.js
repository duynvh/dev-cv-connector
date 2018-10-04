const Validator = require('validator');
const isEmpty = require('./is-empty');

const message = require('../utils/message');
const keys = require('../config/key');

module.exports = function validateEducationInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = message.VALIDATE_MESSAGE.PROFILE.EXPERIENCE.TITLE_EMPTY;
    }

    if(Validator.isEmpty(data.company)) {
        errors.company = message.VALIDATE_MESSAGE.PROFILE.EXPERIENCE.COMPANY_EMPTY;
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = message.VALIDATE_MESSAGE.PROFILE.EXPERIENCE.FROM_DATE_EMPTY;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};