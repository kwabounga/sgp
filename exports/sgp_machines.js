/**
* connection et récupération des valeur des differentes sondes
*/



exports.temperature =  function(){
      return Math.floor(20 + (Math.random() * 20));
}
exports.acidity =  function(){
      return Math.floor(4 + (Math.random() * 5));;
}
exports.humidity =  function(){
      return Math.floor(50 + (Math.random() * 50));;
}
exports.water_level =  function(){
      return Math.floor(0 + (Math.random() * 100));;
}
