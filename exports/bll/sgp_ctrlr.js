var sgpMachines = require('../dal/sgp_machines.js');


exports.commander = function (command, params) {
  // logger.info('sgp commander ', command, params);
  let rep = 'cmd ok';
  return rep;
}


exports.stats = function (connection, columns, limit, callBack, res = false) {
  connection.query('SELECT time_infos,' + columns + ' FROM (SELECT  time_infos,' + columns + ' FROM records order by time_infos desc limit ' + limit + ') as lelmt Order by lelmt.time_infos;', function(error, results, fields) {
    if (error) throw error;
    let stats = {};
    for (var i = 0; i < fields.length; i++) {
      let values = results.map((elmt, e) => {
        return elmt[fields[i].name]
      });
      stats[fields[i].name] = values;
    }

    callBack(stats, res);
  });
};
exports.infos = function (device) {
  // logger.info('info device ', device);
  switch (device.trim()) {
    case 'tp':
    case 'temperature':
      sgpMachines.temperature(function (temp) {
        return temp;
      });
      break;
    case 'hu':
    case 'humidity':
      sgpMachines.humidity(function (humi) {
        return humi;
      });
      break;
    case 'cam':
    case 'camera':
      sgpMachines.camera.takePicture(null, function (picturePath) {
        return picturePath;
      });
      break;
    case 'ac':
    case 'acidity':
      return sgpMachines.acidity();
      break;
    case 'wl':
    case 'water_level':
      return sgpMachines.water_level();
      break;
    case 'luminosity':
      return sgpMachines.luminosity();
      break;
    case 'all':
      return 'allinfos all devices';
      break;
    default:
      return 'bad device';
  }
};
