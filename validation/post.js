const Validator = require('validator');
const isEmpty = require('./is-empty');

const keys = require('../config/key');

const message = require('../utils/message');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: keys.MIN_CHARACTER, max: keys.MAX_CHARACTER })) {
        errors.text = message.VALIDATE_MESSAGE.POST.TEXT_IS_LENGTH;
      }
    
    if (Validator.isEmpty(data.text)) {
        errors.text = message.VALIDATE_MESSAGE.POST.TEXT_EMPTY;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}