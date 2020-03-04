exports.configuration = function(file, callback){
  let fs = require('fs');
  fs.readFile(file,'utf8',(err,data) => {
    if (err) throw err;
    // console.log('configuration data:', data)
    let sd = data.split('\n');
    // console.log('sd', sd);
    var elmt = {};
    for (var i = 0; i < sd.length; i++) {
      let lignes = sd[i].trim().split(':');
      // console.log('ligne', lignes)
      if(lignes == '') break;
       elmt[lignes[0]] = lignes[1];

    }
    callback(elmt);
  })
}
