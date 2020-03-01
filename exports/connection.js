exports.connection = function() {
  var mysql = require('mysql');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'sgpserver',
    password: 'sgpserver',
    database: 'spg'
  });
  connection.connect();
  return connection;
}
