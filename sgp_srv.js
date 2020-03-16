// run:
// node .\sgp_srv.js
process.env.NODE_ENV = 'debug';
var api_rest = require('./exports/rest.js');
var loader_conf = require('./exports/configuration.js');
var conf =  '';
loader_conf.configuration('./conf/.conf', (data) => {
  conf = data;
  var logger = require('./exports/logger.js').logger(conf);
  console.log('conf:', conf)
  console.log(process.env.NODE_ENV);
  logger.info('YO');
  // API REST
  var srv_rest = api_rest.rest(conf);

  Monitoring
  var Monitoring = require('./exports/sgp_monitoring');
  let mon = new Monitoring('default',conf);
  console.log('[SERVER] init Monitoring');
  mon.init(() => {
    console.log('[SERVER] init Monitoring ..OK');
    console.log('[SERVER] overview');
    mon.overview();
    console.log('[SERVER] global start Monitoring ');
    mon.start();
    mon.summary();
  });
})
