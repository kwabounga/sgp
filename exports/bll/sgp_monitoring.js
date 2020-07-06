var CronJob = require('cron').CronJob;

function Monitoring(profil, conf, logger) {
  this.logger = logger;
  this.profil = profil;
  this.con = require('./connection.js').connection(conf);
  this.params = {};
  this.current_datas = {
    temperature: 35,
    humidity: 50,
    ph: 7,
    water_level: 10,
  };
  this.isInit = false;
  this.machines = require('./sgp_machines.js');
}

Monitoring.prototype.init = function(callBack) {
  this.logger.info('[Monitoring] init()')
  var me = this;
  this.con.query('SELECT * from scenarios s where s.scen_name=?;', [this.profil], function(error, results, fields) {
    if (error) throw error;
    me.logger.info('cllBack query ' + results[0]);
    me.params = results[0];
    me.isInit = true;

    if (callBack != null) {
      me.logger.info('[Monitoring] init() >> callBack()')
      callBack();
    }
  });

  // this.logger.info(this.params);


}
Monitoring.prototype.overview = function() {
  if (!this.isInit) {
    this.logger.warn('[Monitoring] not initialized yet')
    return;
  }
  this.logger.info('[Monitoring] overview')
  this.logger.info(this.params);
}

Monitoring.prototype.summary = function() {
  let me = this;
  this.logger.info('\t[Monitoring] summary:')
  this.con.query('SELECT * from records ORDER BY `id` DESC LIMIT 1', function(error, results, fields) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
      me.logger.info('\tRecords: ', results[i]);
    }
  });
}
Monitoring.prototype.statement = function() {
  let me = this;
  let te = this.machines.temperature();
  let hu = this.machines.humidity();
  let ph = this.machines.acidity();
  let wl = this.machines.water_level();
  this.con.query('INSERT INTO records (time_infos, temperature, humidity, ph, water_level, luminosity) VALUES (now(),' + te + ', ' + hu + ', ' + ph + ', ' + wl + ', ' + true + ') ', function(error, results, fields) {
    if (error) throw error;
    me.logger.info('\tInsert successful: ', results);
    me.summary();
  });
}
/*
id: 1,
scen_name: 'default',
light_day: '00:00:00',
light_night: '16:00:00',
temperature: 35,
temperature_tests_frequency: 3,
humidity: 50,
humidity_tests_frequency: 4,
ph: 7,
ph_tests_frequency: 12,
water_level_min: 10,
water_level_max: 40,
water_level_tests_frequency: 5,
ventilation_intraction_duration: 120,
ventilation_intraction_frequency: 4,
ventilation_extraction_duration: 60,
ventilation_extraction_frequency: 3,
records_frequency: 5,
screens_frequency: 60
*/

Monitoring.prototype.start = function() {
  if (!this.isInit) {
    this.logger.warn('[Monitoring] not initialized yet')
    return;
  }
  this.start_mon_summary();
  this.start_mon_temperature();
  this.start_mon_humidity();
}

Monitoring.prototype.start_mon_summary = function() {
  if (!this.isInit) {
    this.logger.info('[Monitoring] not initialized yet')
    return;
  }
  //// CRON
  let me = this;
  let time_job = this.params.records_frequency;
  let job = new CronJob('*/' + time_job + ' * * * *', function() {
    me.logger.info('Monitoring summary every ' + time_job + ' minutes');
    me.logger.info('[MON summary] ');
    me.statement();
    // connection.end();


  }, null, true, 'America/Los_Angeles');
  job.start();
  return job;
}
Monitoring.prototype.start_mon_temperature = function() {
  if (!this.isInit) {
    this.logger.warn('[Monitoring] not initialized yet')
    return;
  }
  //// CRON
  let me = this
  let time_job = this.params.temperature_tests_frequency;
  let job = new CronJob('*/' + time_job + ' * * * *', function() {
    me.logger.info('Monitoring temperature every ' + time_job + ' minutes');
    me.logger.info('[MON temperature] ', me.machines.temperature())
    // connection.end();


  }, null, true, 'America/Los_Angeles');
  job.start();
  return job;
}
Monitoring.prototype.start_mon_humidity = function() {
  if (!this.isInit) {
    this.logger.warn('[Monitoring] not initialized yet')
    return;
  }
  //// CRON
  let me = this
  let time_job = this.params.humidity_tests_frequency;
  let job = new CronJob('* */' + time_job + ' * * *', function() {
    me.logger.info('Monitoring humidity every ' + time_job + ' hours');
    me.logger.info('[MON humidity] ', me.machines.humidity())
    // connection.end();


  }, null, true, 'America/Los_Angeles');
  job.start();
  return job;
}


module.exports = Monitoring;
