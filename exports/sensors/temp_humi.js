// detection temperature et humidité exemple à adapter
const dht = require('pigpio-dht');

const dataPin = 23;
const dhtType = 22; //optional
const sensor = dht(dataPin, dhtType);

// setInterval(() => {
// 	sensor.read();
// }, 2500); // the sensor can only be red every 2 seconds
//
// sensor.on('result', data => {
// 	console.log(`temp: ${data.temperature}°c`);
// 	console.log(`rhum: ${data.humidity}%`);
// });
//
// sensor.on('badChecksum', () => {
// 	console.log('checksum failed');
// });


exports.getTemperature = function(callBack) {
  sensor.read();
  sensor.on('result', data => {
    callBack(data.temperature);
    // console.log(`temp: ${data.temperature}%`);
  });

  sensor.on('badChecksum', () => {
    callBack('temperature checksum failed');
    // console.log('checksum failed');
  });
}
exports.getHumidity = function(callBack) {
  sensor.read();
  sensor.on('result', data => {
    callBack(data.humidity);
    // console.log(`hum: ${data.humidity}%`);
  });

  sensor.on('badChecksum', () => {
    callBack('humidity checksum failed');
    // console.log('checksum failed');
  });
}
