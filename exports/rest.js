exports.rest = function(conf) {
  const NOTHING_HERE = {
    result: 'NOTHING HERE'
  }
  var express = require('express');
  // var connection = require('./connection.js').connection(conf);
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
    let map = [];
    map.push('/tests/')
    map.push('/execute/:command/:param1/:code')
    map.push('/infos')
    map.push('/infos/:device/:code')
    map.push('/stats/:type/:code')
    map.push('/photo/:device')
    map.push('/*')
    res.send(map);
  });
  //PHOTO
  app.route('/photo/:device').get(function(req, res) {
    console.log('server take photo');

    res.sendFile('/home/pi/Documents/sgp/img/' + req.params.device + '/hackerman.jpg');
  });
  //TESTS
  app.route('/tests/*').get(function(req, res) {
    console.log('server execute test routing');
    res.send('' + sgp_machines.temperature());
  });


  //COMMAND
  app.route('/execute/:command/:param1/:code').get(function(req, res) {
    console.log('server execute command', req.params.command, req.params.param1);
    if (req.params.code === code.getCode(conf)) {
      res.send(sgp.commander(req.params.command, req.params.param1));
    } else {
      res.send(NOTHING_HERE)
    }
  });


  //INFOS GENERALS
  app.route('/infos').get(function(req, res) {
    let gen = 'all';
    console.log('server generals infos device', gen);
    res.send(sgp.infos(gen));
  });


  //INFOS
  app.route('/infos/:device/:code').get(function(req, res) {
    console.log('server infos device', req.params.device);
    console.log(req.params.code, code.getCode(conf));
    if (req.params.code == code.getCode(conf)) {
      res.send(sgp.infos(req.params.device));
    } else {
      res.send(NOTHING_HERE);
    }
  });
  //STATS
  // app.route('/stats/:type/:code').get(function(req, res) {
  //   console.log('server stats:', req.params.type);
  //   console.log(req.params.code, code.getCode(conf))
  //   if(req.params.code == code.getCode(conf)){
  //     connection.query('SELECT ' + req.params.type + ' from records ;', function(error, results, fields){
  //       if(error) throw error;
  //       // console.log(results[0]);
  //       let rep = ''
  //       for (var i = 0; i < fields.length; i++) {
  //         let values = results.map((elmt,i) => {return elmt[fields[i].name]});
  //         rep += (fields[i].name + ':' + values) + '\n';
  //       }
  //       res.send(rep);
  //       // res.send(results);
  //     });
  //   }else{
  //     res.send(NOTHING_HERE)
  //   }
  // });

  //404
  app.route('*').get(function(req, res) {
    console.log('server bad gateway');

    res.send({
      error: 'BAD GATEWAY'
    });
  });
  var server = app.listen(conf.rest_port, function() {});
  return server;
};
