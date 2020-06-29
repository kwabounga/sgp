const fileHelpers = require('../tools/files_helpers');
const PiCamera = require('pi-camera');

exports.takePicture = function (dimensions, callBack) {
  // redefine dimentions
  // setting unique name
  const uName = fileHelpers.getUniqueName('cam', '.jpg');

  // create camera object
  const myCamera = new PiCamera({
    mode: 'photo',
    output: `${__dirname}/${uName}`,
    width: dimensions.width,
    height: dimensions.height,
    nopreview: true,
  });

  // taking picture
  myCamera.snap()
    .then((result) => {
      // success
      console.log('photo prise!');
      callBack(myCamera.config.output);
    })
    .catch((error) => {
      // error
      console.log('erreur! ', error.message);
      callBack(null);
    });
};
