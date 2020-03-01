var code = require('../exports/session.js');
  // entry point here
  function init (param = '') {
    console.log('main.js init', param)
    // process here
    updateDashboard();
  }

  function updateDashboard(){
    let bd = document.body
    bd.appendChild(document.createTextNode(code.getCode()))
    let div = document.getElementById('dashboard')
    ajaxGet('http://localhost:4000/infos/cam1/' + code.getCode(), function(data){
        div.innerHTML += '' + data
    })
    ajaxGet('http://localhost:4000/infos/cam2/' + code.getCode(), function(data){
        div.innerHTML += '' + data
    })

    ajaxGet('http://localhost:4000/tests/' + code.getCode(), function(data){
        div.innerHTML += '' + data
    })

  }


    /**
     * ajaxPost Execute a ajax post
     * @param {String} - the url of the file
     * @param {String} - the data content to post
     * @param {Function} - the callBack called if succes
     * @param {Boolean} - to set jSon post format in case
     */

    function ajaxPost( url, data, callback, isJson = false ) {
      var req = new XMLHttpRequest();
      req.open( "POST", url );
      req.addEventListener( "load", function () {
        if ( req.status >= 200 && req.status < 400 ) {
          // execute the callback with the data in parameters
          callback( req.responseText );
        } else {
          console.error( req.status + " " + req.statusText + " " + url );
        }
      } );
      req.addEventListener( "error", function () {
        console.error( "Erreur réseau avec l'URL " + url );
      } );
      if ( isJson ) {
        // set header file as json
        req.setRequestHeader( "Content-Type", "application/json" );
        // format to jSon if specified
        data = JSON.stringify( data );
      }
      req.send( data );
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
