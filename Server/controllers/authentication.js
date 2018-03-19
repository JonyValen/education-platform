const { createUser }  = require('../services/utils')
const passport = require('../services/local');

const handleResponse = (res, code, statusMsg)  => {
    res.status(code).json({status: statusMsg});
}

exports.signin = (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {
        if (err) { handleResponse(res, 500, 'error'); }
        if (!user) { handleResponse(res, 404, 'User not found'); }
        if (user) {
          req.logIn(user, function (err) {
            if (err) { handleResponse(res, 500, 'error'); }
            handleResponse(res, 200, 'success');
          });
        }
      })(req, res, next);
}

exports.signup = (req, res, next) => (
    createUser(req.body.username, req.body.password, res)
    .then((response) => {
        passport.authenticate('local', (err, user, info) => {
            if (user) { handleResponse(res, 200, 'success'); }
        })(req, res, next);
    })
    .catch(err => handleResponse(res, 500, 'error'))
)