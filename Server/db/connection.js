const environment = process.env.NODE_ENV;
const config = require('../../knexfile.js')[environment || 'development'];

module.exports = require('knex')(config);
