// run:
// node .\sgp_srv.js

var api_rest = require('./exports/rest.js');
var srv_rest = api_rest.rest(4400);





var Monitoring = require('./exports/sgp_monitoring');
let mon = new Monitoring('default');
console.log('[SERVER] init Monitoring');
mon.init(() => {
  console.log('[SERVER] init Monitoring ..OK');

  console.log('[SERVER] overview');
  mon.overview();
  console.log('[SERVER] global start Monitoring ');
  mon.start();
  mon.summary();
});
