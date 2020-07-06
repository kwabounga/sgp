const Gpio = require('pigpio').Gpio;
// const GpioBank = require('pigpio').GpioBank;
const motor = new Gpio(10, {
  mode: Gpio.OUTPUT
});

let convert = function (deg) {
  // 0_180
  // 500_2500
  if (deg > 180){
    deg = 180;
  }
  if (deg < 0){
    deg = 0;
  }
  return (deg * 11.11) + 500;
}
exports.setPosition = function (deg) {
  motor.servoWrite(convert(deg));
  console.log('set to ' + deg + '°');
}
