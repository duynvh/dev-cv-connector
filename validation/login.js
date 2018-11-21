const Validator = require('validator');
const isEmpty = require('./is-empty');
const message = require('../utils/message');

// 10 Xử lý chi tiết
//   (2) Xử lý đăng ký
//      2. Xử lý chẹck
//          a. Check hạng mục: 1->3
module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //2.a.3 check Trường hợp email không đúng định dạng
    if(!Validator.isEmail(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_INVALID;
    }

    //2.a.1 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.email)) {
        errors.email = message.VALIDATE_MESSAGE.USER.EMAIL_EMPTY;
    }

    //2.a.2 check Trường hợp chưa nhập, báo lỗi
    if(Validator.isEmpty(data.password)) {
        errors.password = message.VALIDATE_MESSAGE.USER.PASSWORD_EMPTY;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}