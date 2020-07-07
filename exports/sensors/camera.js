let os = require('os');
const fileHelpers = require('../tools/files_helpers');
var PiCamera ;
var dht ;
//
if(os.hostname() === 'raspberrypi'){
  PiCamera = require('pi-camera');

} else {
  PiCamera = require('./fake_camera');

}
exports.takePicture = function (dimensions, callBack, path) {
  // redefine dimentions
  // setting unique name
  const uName = fileHelpers.getUniqueName('cam', '.jpg');
  console.log('uName', uName);
  // create camera object
  const myCamera = new PiCamera({
    mode: 'photo',
    output: `${path}/${uName}`,
    width: dimensions.width,
    height: dimensions.height,
    nopreview: true,
  });

  // taking picture
  myCamera.snap()
    .then((result) => {
      // success
      console.log('snap.then >> ', myCamera.config.output);
      callBack(myCamera.config.output);
    })
    .catch((error) => {
      // error
      console.log('erreur! ', error.message);
      callBack(null);
    });
};
