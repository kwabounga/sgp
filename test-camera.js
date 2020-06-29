const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test_2.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

myCamera.snap()
  .then((result) => {
    // Your picture was captured
    console.log('photo prise!')
    console.log(myCamera.output)

  })
  .catch((error) => {
     // Handle your error
     console.log('erreur!')
  });
