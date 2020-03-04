exports.connection = function(conf) {
  // console.log('conf', conf)
  var mysql = require('mysql');

  let connection = mysql.createConnection({
    host: conf.db_url,
    port: conf.db_port,
    user: conf.db_user,
    password: conf.db_pwd,
    database: conf.db_name
  });
  connection.connect();
  return connection;
}
