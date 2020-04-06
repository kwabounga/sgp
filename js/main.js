var code = require('../exports/session.js');
var conf_init = require('../exports/configuration.js');
var AwesomeButton = require('../exports/view/btn_awesome.js');
var btMngr = new AwesomeButton();
var _conf;
var myChartAll;
var myChartTemp;
let win = require('electron').remote.getCurrentWindow();


// entry point here
function init(param = '') {
  console.log('main.js init', param);
  console.log(win)

  initDom();
  initNav();
  // Event for toggle [Private Mode] (hidden mode)
  let bd = document.body;
  bd.addEventListener('keypress', (evt) => {
    console.log(evt.keyCode, evt.key)
    if (evt.key == ' ') {
      win.setOpacity(Math.abs(win.getOpacity()-1));
    }
  })

  // process here
  conf_init.configuration('./conf/.conf', (data) => {
    _conf = data;
    updateLauncher(2);
  });

}
var initDom = function(){
  /* Temperature */
   let div = document.getElementById("card_temp_info");
   div.innerHTML = '';
   div.appendChild(btMngr.getIcon(btMngr.BUTTON_TYPE_TEMPERATURE))

  /* Humidity */
   div = document.getElementById("card_humi_info");
   div.innerHTML = '';
   div.appendChild(btMngr.getIcon(btMngr.BUTTON_TYPE_HUMIDITY))

  /* Acidity */
   div = document.getElementById("card_acid_info");
   div.innerHTML = '';
   div.appendChild(btMngr.getIcon(btMngr.BUTTON_TYPE_ACIDITY))

  /* Water level */
   div = document.getElementById("card_wlvl_info");
   div.innerHTML = '';
   div.appendChild(btMngr.getIcon(btMngr.BUTTON_TYPE_WATER))

  /* Light */
   div = document.getElementById("card_light_info");
   div.innerHTML = '';
   div.appendChild(btMngr.getIcon(btMngr.BUTTON_TYPE_LIGHT))
}
var initNav = function(){
  let btHumidity = btMngr.makeButton(btMngr.BUTTON_TYPE_HUMIDITY)
  document.body.appendChild(btHumidity);
}
// fait un appel au serveur pour recuperer les infos toutes les x minutes
function updateLauncher(timeInMinute) {
  updateDashboard();
  let id = setInterval(function() {
    updateDashboard();
  }, (timeInMinute * 60 * 1000)) // ms
  return id;
}

function updateDashboard() {
  let bd = document.body
  console.log('moment code :' + document.createTextNode(code.getCode(_conf)))

  // /* Tests */
  // ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/tests/' + code.getCode(_conf), function(data) {
  //   console.log('Tests', data);
  // })

  /* Temperature */
  ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/infos/temperature/' + code.getCode(_conf), function(data) {
    let div = document.getElementById("card_temp_data");
    div.innerHTML = data + '°'
  })

  /* Humidité */
  ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/infos/humidity/' + code.getCode(_conf), function(data) {
    let div = document.getElementById("card_humi_data");
    div.innerHTML = data + '%'
  })

  /* Acidité */
  ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/infos/acidity/' + code.getCode(_conf), function(data) {
    let div = document.getElementById("card_acid_data");
    div.innerHTML = 'PH' + data
  })

  /* Niveau d'eau */
  ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/infos/water_level/' + code.getCode(_conf), function(data) {
    let div = document.getElementById("card_wlvl_data");
    div.innerHTML = data + 'cm'
  })

  /* Etat Lumière */
  ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/infos/luminosity/' + code.getCode(_conf), function(data) {
    let div = document.getElementById("card_light_data");
    div.innerHTML = (data == 'true' ? 'ON' : 'OFF');
    console.log(data)
    let divInf = document.getElementById("card_light_info");
    divInf.innerHTML = '';
    divInf.appendChild(data == 'true' ? btMngr.getIcon(btMngr.BUTTON_TYPE_LIGHTON) : btMngr.getIcon(btMngr.BUTTON_TYPE_LIGHT))
  })

  /// stats all
  ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/stats/water_level,temperature,humidity,ph/' + 70 + '/' + code.getCode(_conf), function(data) {
    if(myChartAll){
      myChartAll.destroy();
      myChartAll = null;
    }
    myChartAll = chartThat(data,  document.getElementById('chart_all'))
  })
  /// stats temp
  ajaxGet('http://' + _conf.rest_url + ':' + _conf.rest_port + '/stats/temperature/' + 30 + '/' + code.getCode(_conf), function(data) {
    if(myChartTemp){
      myChartTemp.destroy();
      myChartTemp = null;
    }
    myChartTemp = chartThat(data,  document.getElementById('chart_temp'))
  })
}


/**
 * ajaxPost Execute a ajax post
 * @param {String} - the url of the file
 * @param {String} - the data content to post
 * @param {Function} - the callBack called if succes
 * @param {Boolean} - to set jSon post format in case
 */

function ajaxPost(url, data, callback, isJson = false) {
  var req = new XMLHttpRequest();
  req.open("POST", url);
  req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) {
      // execute the callback with the data in parameters
      callback(req.responseText);
    } else {
      console.error(req.status + " " + req.statusText + " " + url);
    }
  });
  req.addEventListener("error", function() {
    console.error("Erreur réseau avec l'URL " + url);
  });
  if (isJson) {
    // set header file as json
    req.setRequestHeader("Content-Type", "application/json");
    // format to jSon if specified
    data = JSON.stringify(data);
  }
  req.send(data);
}




/**
 * ajaxGet Execute a ajax call
 * @param {String} - the url of the file
 * @param {Function} - the callBack called if succes
 * @param {Boolean} - to read jSon format in case
 */

function ajaxGet(url, callback, isJson = false) {
  var req = new XMLHttpRequest()
  req.addEventListener('progress', function(e) {
    let percent = Math.round((e.loaded * 100) / e.total)
    console.log('loading progress ', percent + '%')
  })
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      console.log(url + ' ...loaded')
      // get the data from response
      var data = req.responseText
      if (isJson) {
        // format to jSon if specified
        data = JSON.parse(req.responseText)
      }
      // execute the callback with the data in parameters
      callback(data)
    } else {
      // show the error log if something wrong
      console.error(req.status + ' ' + req.statusText + ' ' + url)
    }
  })
  req.addEventListener('error', function() {
    console.error('Erreur réseau avec l\'URL ' + url)
  })
  req.open('GET', url)
  req.send(null)
}



/* test sur les clojures js */

// var Clz = (function(){
//   var prive = 1;
//   class Clz {
//     get public() {
//       return prive;
//     }
//     set public(value) {
//       prive = value;
//     }
//   }
//   return Clz;
// })();
