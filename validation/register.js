const Validator = require('validator');
const isEmpty = require('./is-empty');

const keys = require('../config/key');
const message = require('../utils/message');

// 10 Xử lý chi tiết
//   (2) Xử lý đăng ký
//      2. Xử lý chẹck
//          a. Check hạng mục: 1->8

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    //2.a.5 check Trường hợp nhập chưa đúng số lượng ký tự
    if(!Validator.isLength(data.name, {min: keys.MIN_CHARACTER, max: keys.MAX_CHARACTER})) {
        errors.name = message.VALIDATE_MESSAGE.USER.NAME_IS_LENGTH;
    }

    //2.a.1 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.name)) {
        errors.name = message.VALIDATE_MESSAGE.USER.NAME_EMPTY;
    }

    //2.a.6 check Trường hợp email không đúng định dạng
    if(!Validator.isEmail(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_INVALID;
    }

    //2.a.2 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_EMPTY;
    }

    //2.a.3 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.password)) {
        errors.password = message.VALIDATE_MESSAGE.USER.PASSWORD_EMPTY;
    }

    //2.a.7 check Trường hợp chưa nhập, báo lỗi
    if(!Validator.isLength(data.password, {min: keys.MIN_CHARACTER, max: keys.MAX_CHARACTER})) {
        errors.password = message.VALIDATE_MESSAGE.USER.PASSWORD_IS_LENGTH;
    }

    //2.a.4 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = message.VALIDATE_MESSAGE.USER.CONFIRM_PASSWORD_EMPTY;
    }
    else {
        //2.a.8 check Trường hợp chưa nhập, báo lỗi
        if(!Validator.equals(data.password, data.password2)) {
            errors.password2 = message.VALIDATE_MESSAGE.USER.CONFIRM_PASSWORD_NOT_MATCH;
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}