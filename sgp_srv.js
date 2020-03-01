// run:
// node .\sgp_srv.js

var express = require('express');
var connection = require('./exports/connection.js').connection();
var sgp = require('./exports/sgp_ctrlr.js');
var sgp_machines = require('./exports/sgp_machines.js');
var code = require('./exports/session.js');

// app initialisation
var app = express();
// app webroot folder déclarations
// app.use(express.static('html'));


//TESTS
app.route('/tests/*').get(function(req, res) {
  console.log('server execute test routing');
  res.send('' + sgp_machines.thermosta());
});


//COMMAND
app.route('/execute/:command/:param1/:code').get(function(req, res) {
  console.log('server execute command', req.params.command, req.params.param1);
  if(req.params.code === code.getCode()){
    res.send(sgp.commander(req.params.command, req.params.param1));
  }
});


//INFOS GENERALS
app.route('/infos').get(function(req, res) {
  let gen = 'all'
  console.log('server generals infos device', gen);
  res.send(sgp.infos(gen));
});


//INFOS
app.route('/infos/:device/:code').get(function(req, res) {
  console.log('server infos device', req.params.device);
  console.log(req.params.code, code.getCode())
  if(req.params.code == code.getCode()){
    res.send(sgp.infos(req.params.device));
  }
});


//404
app.route('*').get(function(req, res) {
  console.log('server bad gateway');

  res.send({error:'BAD GATEWAY'});
});
var server = app.listen(4000, function() {});






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
