/**
* connection et récupération des valeur des differentes sondes
*/



exports.temperature =  function(){
      return Math.floor(20 + (Math.random() * 40));
}
exports.acidity =  function(){
      return Math.floor(4 + (Math.random() * 6));
}
exports.humidity =  function(){
      return Math.floor(40 + (Math.random() * 60));
}
exports.water_level =  function(){
      return Math.floor(20 + (Math.random() * 50));
}
exports.luminosity =  function(){
      return Math.floor((Math.random() * 10) > 5) ? true:false;
}
