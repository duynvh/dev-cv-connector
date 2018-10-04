const userService = require('../service/user.service');

module.exports = {
    register,
    login,
    current
};

function register(req, res, next) {
    const params = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
    };

    userService.register(params).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err);
    })
}

function login(req, res, next) {
    const params = {
        email: req.body.email,
        password: req.body.password
    };

    userService.login(params).then((response) => {
        res.send(response)
    }).catch((err) => {
        res.send(err);
    })
}

function current(req, res, next) {
    userService.current(req).then((response) => {
        res.send(response);
    }).catch(err => res.send(err));
}