// run:
// node .\sgp_srv.js
process.env.NODE_ENV = 'debug';
var api_rest = require('./exports/rest.js');
var loader_conf = require('./exports/configuration.js');
var conf =  '';

loader_conf.configuration('./conf/.conf', (data) => {
  conf = data;

  // logger Server
  var logger = require('./exports/logger.js').logger(conf);
  logger.defaultMeta.service = 'Server';
  logger.info('LANCEMENT DU SERVEUR SGP');
  logger.info('conf:' +  conf)
  logger.info(process.env.NODE_ENV);

  // API REST
  var srv_rest = api_rest.rest(conf,__dirname);

  // Monitoring
  var Monitoring = require('./exports/bll/sgp_monitoring');

  // Logger Monitoring
  var loggerMon = require('./exports/logger.js').logger(conf);
  loggerMon.defaultMeta.service = 'Monitoring';
  const mon = new Monitoring('default', conf, loggerMon);
  logger.info('[SERVER] init Monitoring');
  mon.init(() => {
    logger.info('[SERVER] init Monitoring ..OK');
    logger.info('[SERVER] overview');
    mon.overview();
    logger.info('[SERVER] global start Monitoring ');
    mon.start();
    mon.summary();
  });


  // const WebSocket = require('ws')
  // const wss = new WebSocket.Server({ port: 8080 })
  //
  // wss.on('connection', ws => {
  //   ws.on('message', message => {
  //
  //     if(message == 'Client Connected'){
  //       console.log(`Received message => ${message}`);
  //
  //     }else{
  //       console.log(`Received command => ${message}`);
  //
  //     }
  //   })
  //   ws.send('Connection aux controles en temp reel');
  // })
})
