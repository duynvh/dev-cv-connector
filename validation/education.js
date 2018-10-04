const Validator = require('validator');
const isEmpty = require('./is-empty');

const message = require('../utils/message');
const keys = require('../config/key');

module.exports = function validateEducationInput(data) {
    let errors = {};
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.school)) {
        errors.school = message.VALIDATE_MESSAGE.PROFILE.EDUCATION.SCHOOL_EMPTY;
    }

    if(Validator.isEmpty(data.degree)) {
        errors.degree = message.VALIDATE_MESSAGE.PROFILE.EDUCATION.DEGREE_EMPTY;
    }

    if(Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = message.VALIDATE_MESSAGE.PROFILE.EDUCATION.FILE_OF_STUDY_EMPTY;
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = message.VALIDATE_MESSAGE.PROFILE.EDUCATION.FROM_DATE_EMPTY;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};