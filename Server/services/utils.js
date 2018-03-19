const bcrypt = require('bcryptjs');
const knex = require('../db/connection');

exports.comparePass = (userPassword, databasePassword) => (bcrypt.compareSync(userPassword, databasePassword));
exports.createUser = (username, password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return knex('users')
    .insert({
        username: username,
        password: hash
    })
    .returning('*');
}

exports.loginRequired = (req, res, next) => {
    if (!req.user) return res.status(401).json({status: 'Please log in'});
    return next();
}