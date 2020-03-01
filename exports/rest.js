exports.rest = function(port){
  const NOTHING_HERE = {result:'NOTHING HERE'}
  var express = require('express');
  var connection = require('./connection.js').connection();
  var sgp = require('./sgp_ctrlr.js');
  var sgp_machines = require('./sgp_machines.js');
  var code = require('./session.js');

  // app initialisation
  var app = express();
  // app webroot folder déclarations
  // app.use(express.static('html'));

  //ROADMAP
  app.route('/map/*').get(function(req, res) {
    console.log('[show map]');
    let map = '<DOCTYPE html/>';
       map += '<html>'
       map += '<body>'
       map += '/tests/<br />'
       map += '/execute/:command/:param1/:code<br />'
       map += '/infos<br />'
       map += '/infos/:device/:code<br />'
       map += '/*<br />'
       map += '</body>'
       map += '</html>'
    res.send(map);
  });
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
    }else{
      res.send(NOTHING_HERE)
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
    }else{
      res.send(NOTHING_HERE)
    }
  });


  //404
  app.route('*').get(function(req, res) {
    console.log('server bad gateway');

    res.send({error:'BAD GATEWAY'});
  });
  var server = app.listen(port, function() {});
  return server;
};
