let getIpClient = function (req){
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}
let formatTrackingBadReq = function(req){
  let ip1 = req.headers['x-forwarded-for'];
  let ip2 = req.connection.remoteAddress;
  let ip3 = req.ip;
  let ips = req.ips;
  // req.method:
  //  _peername
  return '['+ ip1 +'] ['+ ip2 +'] ['+ ip3 +'] ['+ ips +'] ['+ req.url + '] ['+ req.method + '] ['+ JSON.stringify(req.connection._peername) + ']' + JSON.stringify(req.params)
}

exports.rest = function(conf, rootPath) {
  var logger = require('./logger.js').logger(conf);
  logger.defaultMeta.service = "SGP Rest";
  const NOTHING_HERE = {
    result: 'NOTHING HERE'
  }
  var express = require('express');
  var connection = require('./connection.js').connection(conf);
  var sgp = require('./sgp_ctrlr.js');
  var sgp_machines = require('./sgp_machines.js');
  var code = require('./session.js');

  // app initialisation
  var app = express();
  // app webroot folder déclarations
  // app.use(express.static('html'));
  // app.set('trust proxy', true)
  app.enable('trust proxy')
  //ROADMAP
  app.route('/map/*').get(function(req, res) {
    logger.info('[show map]');
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
    logger.info('server take photo');

    res.sendFile('/home/pi/sgp/img/' + req.params.device + '/hackerman.jpg');
  });
  //TESTS
  app.route('/tests/*').get(function(req, res) {
    logger.info('[tests] execute test routing');
    console.log(formatTrackingBadReq(req));
    console.log(req.connection);
    res.status(200).send(formatTrackingBadReq(req) + JSON.stringify(req.params)+ JSON.stringify(req.headers));
  });
  //FAVICON
  app.route('/favicon.ico').get(function(req, res) {
    logger.info('[favicon] get favicon');
    res.sendFile(rootPath+'/img/favicon.ico', function (err) {
      if (err) {
        logger.error(err)
      } else {
        logger.info('[favicon] send!');
      }
    })
    // res.status(200).send(formatTrackingBadReq(req) + JSON.stringify(req.params)+ JSON.stringify(req.headers));
  });


  //COMMAND
  app.route('/execute/:command/:param1/:code').get(function(req, res) {
    logger.info('server execute command '+ req.params.command+ req.params.param1);
    if (req.params.code === code.getCode(conf)) {
      res.send(sgp.commander(req.params.command, req.params.param1));
    } else {
      logger.warn('Attempt to excecute without access');
      logger.warn(formatTrackingBadReq(req));
      res.status(403).send('Forbidden');
    }
  });


  //INFOS GENERALS
  app.route('/infos').get(function(req, res) {
    let gen = 'all';
    logger.info('server generals infos device '+ gen);
    res.send(sgp.infos(gen));
  });


  //INFOS
  app.route('/infos/:device/:code').get(function(req, res) {
  // app.route('/infos/:device/*').get(function(req, res) {
    logger.info('server infos device '+ req.params.device);
    // logger.warn(req.params);

    logger.log('verbose',req.params.code+ ' ' +code.getCode(conf));
    if (req.params.code == code.getCode(conf)) {
      res.status(200).send( '' + sgp.infos(req.params.device));
    } else {
      logger.warn('Attempt to get infos without access');
      logger.warn(formatTrackingBadReq(req));
      res.status(403).send('Forbidden');
    }
    // res.status(200).send('' + sgp.infos(req.params.device));
  });
  //STATS
  app.route('/stats/:type/:limit/:code').get(function(req, res) {
    logger.info('server stats: '+ req.params.type);
    logger.info(req.params.code+' ' + code.getCode(conf))
    if(req.params.code == code.getCode(conf)){
      sgp.stats(connection,req.params.type,req.params.limit,(data,res)=>{
        res.send(data);
      },res);
    }else{
      logger.warn('Attempt to get stats without access');
      logger.warn(formatTrackingBadReq(req));
      res.status(403).send('Forbidden');
    }
  });

  //404
  app.route('*').get(function(req, res) {
    logger.warn('Bad Request');
    logger.warn(formatTrackingBadReq(req));
    res.status(400).send('Bad Request');
    // res.sendStatus(403);
  });
  var server = app.listen(conf.rest_port, function() {});
  return server;
};
