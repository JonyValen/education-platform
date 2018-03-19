const passport = require('passport')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const { loginRequired } = require('./services/utils')

module.exports = function(app) {
    app.get('/', loginRequired, (req, res) => {
        res.send({ message: 'Super secret code is ABC123' })
    })

    app.post('/signin', Authentication.signin)
    app.post('/signup', Authentication.signup)
}