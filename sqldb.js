var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '106.15.203.69',
  user     : 'root',
  password : 'Jrh20060607+',
  database : 'zkldatabase',
  port: '3306'
});

module.exports = connection;