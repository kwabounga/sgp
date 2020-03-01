exports.commander =  function(command, params){
  console.log('sgp commander ', command, params);
  let rep = 'cmd ok';
  return rep;
}


exports.infos =  function(device){
  console.log('info device ', device);
  let rep = 'info device ' + device;
  return rep;
}
