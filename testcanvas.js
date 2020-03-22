var asciify = require('image-asciify-cli');
const DashBoard = require('@kwabounga/cli_dashboard');
let db = new DashBoard();

var options = {
  fit:    'box',
  width:  db.width,
  height: db.height
}

asciify(__dirname + '/img/cam1/hackerman.jpg', options, function (err, asciified) {
  if (err) throw err;

  // Print to console
  console.log(asciified);
});
