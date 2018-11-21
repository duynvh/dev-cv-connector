const Validator = require('validator');
const isEmpty = require('./is-empty');

const message = require('../utils/message');
const keys = require('../config/key');

//10. Xử lý chi tiết
//  (2) Xử lý cập nhật
//      2. Xử lý check
//          a. Check hạng mục
module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    //2.a.4 check Trường hợp nhập chưa đúng số lượng ký tự
    if(!Validator.isLength(data.handle, {min: keys.MIN_CHARACTER, max: keys.MAX_CHARACTER})) {
        errors.handle = message.VALIDATE_MESSAGE.PROFILE.HANDLE_IS_LENGTH;
    }

    //2.a.1 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.handle)) {
        errors.handle = message.VALIDATE_MESSAGE.PROFILE.HANDLE_EMPTY;
    }

    //2.a.2 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.status)) {
        errors.status = message.VALIDATE_MESSAGE.PROFILE.STATUS_EMPTY;
    }

    //2.a.3 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.skills)) {
        errors.skills = message.VALIDATE_MESSAGE.PROFILE.SKILLS_EMPTY;
    }

    //2.a.5 check Trường hợp nhập không đúng định dang URL
    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    //2.a.6 check Trường hợp nhập không đúng định dang URL
    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    //2.a.7 check Trường hợp nhập không đúng định dang URL
    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    //2.a.8 check Trường hợp nhập không đúng định dang URL
    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    //2.a.9 check Trường hợp nhập không đúng định dang URL
    if(!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = message.VALIDATE_MESSAGE.PROFILE.NOT_VALID_URL;
        }
    }

    //2.a.10 check Trường hợp nhập không đúng định dang URL
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