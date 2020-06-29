exports.connection = function(conf) {
  let os = require('os');
  let connection;

  // RPI Connection db
  if(os.hostname() === 'raspberrypi'){
    //mariadb

    const mariadb = require('mariadb/callback');
    connection = mariadb.createConnection({
      host: conf.db_url,
      port: conf.db_port,
      user: conf.db_user,
      password: conf.db_pwd,
      database: conf.db_name
    });
  // Local Connection db
  } else if(os.hostname() == 'KWA-ULTRAB') {
    // mysql

    const mysql = require('mysql');
    connection = mysql.createConnection({
      host: conf.db_url,
      port: conf.db_port,
      user: conf.db_user,
      password: conf.db_pwd,
      database: conf.db_name
    });
    connection.connect();
  }

  return connection;
}
