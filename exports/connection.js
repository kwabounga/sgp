exports.connection = function(conf) {
  // mysql
  // var mysql = require('mysql');
  //
  // let connection = mysql.createConnection({
  //   host: conf.db_url,
  //   port: conf.db_port,
  //   user: conf.db_user,
  //   password: conf.db_pwd,
  //   database: conf.db_name
  // });
  //


  //mariadb

  const mariadb = require('mariadb/callback');
  let connection = mariadb.createConnection({
    host: conf.db_url,
    port: conf.db_port,
    user: conf.db_user,
    password: conf.db_pwd,
    database: conf.db_name
  });
  // connection.connect();
  return connection;
}
