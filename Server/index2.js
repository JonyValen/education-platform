const mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'gyde-address',
  user     : 'root',
  password : 'root',
  database : 'gyde'
});

connection.connect()

connection.query('SHOW TABLES', (err, results, fields) => {
  if(err) throw err
  console.log('Tables:', results[0])
})
