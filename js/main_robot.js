const WebSocket = require('ws');
var connection;
var code = require('../exports/tools/session.js');
var conf_init = require('../exports/configuration.js');
var joystick;
var joystick2;

// entry point here
function init(param = '') {
  console.log('main.js init', param);
  // process here
  conf_init.configuration('./conf/.conf', (data) => {
    conf = data;
    initConnection();

    console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
    var interval;
    var interval2;
    joystick = new VirtualJoystick({
      container: document.getElementById('container1'),
      mouseSupport: true,
      stationaryBase: true,
      baseX: window.innerWidth/4,
      baseY: window.innerHeight/2,
    });
    joystick.addEventListener('touchStart', function() {
      console.log('touch down')
      interval = setInterval(sendRobotData, 1 / 30 * 1000);
    });
    joystick.addEventListener('touchEnd', function() {
      console.log('touch up')
      clearInterval(interval);
    });
    joystick._container.addEventListener('mousedown', function() {
      console.log('mouse down')
      interval = setInterval(sendRobotData, 1 / 30 * 1000);
    });
    joystick._container.addEventListener('mouseup', function() {
      console.log('mouse up')
      clearInterval(interval);
    });

    joystick2 = new VirtualJoystick({
      container: document.getElementById('container2'),
      mouseSupport: true,
      stationaryBase: true,
      baseX: window.innerWidth/4,
      baseY: window.innerHeight/2,
    });
    joystick2.addEventListener('touchStart', function() {
      console.log('touch down')
      interval2 = setInterval(sendRobotData2, 1 / 30 * 1000);
    });
    joystick2.addEventListener('touchEnd', function() {
      console.log('touch up')
      clearInterval(interval2);
    });
    joystick2._container.addEventListener('mousedown', function() {
      console.log('mouse down')
      interval2 = setInterval(sendRobotData2, 1 / 30 * 1000);
    });
    joystick2._container.addEventListener('mouseup', function() {
      console.log('mouse up')
      clearInterval(interval2);
    });
    // motionjpeg("motionjpeg");
    initDisplay();
  });

}

function initDisplay() {
  let js1 = document.getElementById('container1');
  js1.style.left = 0 + 'px';
  js1.style.position = 'absolute';
  js1.style.display = 'block';
  js1.style.width = window.innerWidth/2 + 'px';
  js1.style.height = window.innerHeight + 'px';

  let js2 = document.getElementById('container2');
  js2.style.left = window.innerWidth/2 + 'px';
  js2.style.position = 'absolute';
  js2.style.width = window.innerWidth/2 + 'px';
  js2.style.height = window.innerHeight + 'px';
}
function sendRobotData() {
  var outputEl = document.getElementById('resultRight');
  outputEl.innerHTML = 'deltaY ' + map(joystick.deltaY(),-150,150,0,1023) + 'deltaX ' + map(joystick2.deltaX(),-250,250,0,1023)
  connection.send('' + map(joystick.deltaY(),-150,150,0,1023) + '|' + map(joystick2.deltaX(),-250,250,0,1023));
}
function sendRobotData2() {
  var outputEl = document.getElementById('resultLeft');
  outputEl.innerHTML = 'deltaX ' + map(joystick2.deltaX(),-150,150,0,1023) + 'deltaY ' + map(joystick2.deltaY(),-250,250,0,1023)
  // connection.send('' + map(joystick2.deltaX(),-150,150,0,1023) + '|' + map(joystick2.deltaY(),-250,250,0,1023));
}
function initConnection() {
    console.log('ws connection ....');
  const url = 'ws://' + conf.ws_url + ':' + conf.ws_port;
  connection = new WebSocket(url);
  connection.onopen = () => {
    connection.send('Client Connected');
  }

  connection.onerror = (error) => {
    console.log(`WebSocket error: ${error.message}`)
  }

  connection.onmessage = (e) => {
    console.log('ws msg received ....');
    console.log(e.data)
  }
}
// function motionjpeg(id) {
//     var image = document.getElementById(id), src;
//
//     if (!image.length) return;
//
//     src = image.getAttribute("src");
//     if (src.indexOf("?") < 0) {
//         image.setAttribute("src", src + "?"); // must have querystring
//     }
//
//     image.addEventListener("onload", function() {
//       console.log('img loaded: reload')
//         // this cause the load event to be called "recursively"
//         this.src = this.src.replace(/\?[^\n]*$/, "?") +
//             (new Date()).getTime(); // 'this' refers to the image
//     });
// }
