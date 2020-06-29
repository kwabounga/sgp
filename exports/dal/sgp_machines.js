/**
 * connection et récupération des valeur des differentes sondes
 */
const tempHumi = require('../sensors/temp_humi');
const camera = require('../sensors/camera');

exports.temperature = function (callBack) {
  // temperature
  tempHumi.getTemperature(callBack);
};
exports.humidity = function (callBack) {
  // humidité de l'air
  tempHumi.getHumidity(callBack);
};
exports.acidity = function () {
  // acidité
  return Math.floor(4 + (Math.random() * 6));
};
exports.water_level = function () {
  // niveau d'eau
  return Math.floor(20 + (Math.random() * 50));
};
exports.luminosity = function () {
  // boolean on/off
  return (Math.floor(Math.random() * 10) > 5);
};

exports.camera = {
  takePicture: function (dimensions, callBack) {
    if (!dimensions) {
      dimensions = {
        width: 640,
        height: 480
      };
    }
    camera.takePicture(dimensions, callBack);
  }
};
