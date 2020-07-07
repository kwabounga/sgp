// detection temperature et humidité exemple à adapter
let os = require('os');
var dht ;
//
if(os.hostname() === 'raspberrypi'){
  dht = require('pigpio-dht');

} else {
  dht = require('../sensors/fake_sensors');

}

const dataPin = 23;
const dhtType = 11; // optional
const sensor = dht(dataPin, dhtType);

var lastTemp = -272;
var lastHum = -272;
var i;

/*
  // TODO:
  clear interval on finish
  remove handlers result and badChecksum
  sensor.off('result', function)
  sensor.off('badChecksum', function)

  pour faire ca : extraire les functions lors de l'enregistrement des evenements par des fonctions nommées
  enregistrer le setinterval pour pouvoir le clear
*/
var setValues = function (data) {
  // console.log(data);
  lastTemp = data.temperature;
  lastHum = data.humidity;
}
var badCheckSum = function (error) {
  console.log('[sensor] [DHT11] /!\\ checksum failed /!\\');
}

exports.getTemperature = function (callBack) {
  callBack(lastTemp);
};
exports.getHumidity = function (callBack) {
  callBack(lastHum);
};

exports.stopReading = function () {
  clearInterval(i);
  sensor.on('result', setValues);
  sensor.on('badChecksum', badCheckSum);
};
exports.startReading = function () {
  console.log('[sensor] [DHT11] ... activating');
  i = setInterval(() => {
    sensor.read();
  }, 2500); // the sensor can only be read every 2 seconds max

  sensor.on('result', setValues);
  sensor.on('badChecksum', badCheckSum);
};
