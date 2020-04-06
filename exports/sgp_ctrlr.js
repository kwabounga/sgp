var sgp_machines = require('./sgp_machines.js');


exports.commander =  function(command, params){
  // logger.info('sgp commander ', command, params);
  let rep = 'cmd ok';
  return rep;
}


exports.stats =  function(connection, columns, limit,callBack,res = false){
  connection.query('SELECT time_infos,' + columns + ' FROM (SELECT  time_infos,' + columns + ' FROM records order by time_infos desc limit '+ limit +'	) as lelmt Order by lelmt.time_infos;', function(error, results, fields){
    if(error) throw error;
    let stats = {};
    for (var i = 0; i < fields.length; i++) {
      let values = results.map((elmt,e) => {return elmt[fields[i].name]});
      stats[fields[i].name] = values;
    }

    callBack(stats,res);
  });
}
exports.infos =  function(device){
  // logger.info('info device ', device);
  switch (device.trim()) {
    case 'tp':
    case 'temperature':
      return sgp_machines.temperature();
      break;
    case 'hu':
    case 'humidity':
      return sgp_machines.humidity();
      break;
    case 'ac':
    case 'acidity':
      return sgp_machines.acidity();
      break;
    case 'wl':
    case 'water_level':
      return sgp_machines.water_level();
      break;
    case 'luminosity':
      return sgp_machines.luminosity();
      break;
    case 'all':
      return 'allinfos all devices';
      break;
    default:
      return 'bad device';

  }
  // let rep = 'info device ' + device;
  // return rep;
}
