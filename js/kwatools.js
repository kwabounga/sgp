var testMode = true;

// constantes pour les styles css debug
var NORMAL = "normal";
var ALERT = "alert";
var INFOS = "infos";
var VALIDE = "valide";
var FUNCTION = "function";
var CONSTRUC = "construc";
var METHODE = "methode";

// CSS For debug console
var styleWarning = ['color: red', 'font-weight: bold'].join(';');
var styleInfo = ['color: blue', 'font-weight: bold'].join(';');
var styleValide = ['color: green', 'font-weight: bold', 'font-family: verdana', 'font-size: 10pt'].join(';');
var styleFunction = ['font-style: italic', 'color: SteelBlue '].join(';');
var styleConstruc = ['font-style: italic', 'color: teal '].join(';');
var styleMethode = ['font-style: italic', 'color: olive '].join(';');


// return a pseudo randomBoolean with a pseudo percentage of 'true'
function randomBoolean(_percent = 20) {
  var rdBoo = Math.floor(Math.random() * 100);
  return (rdBoo > _percent) ? 0 : 1;
}

// return a random integer
function randomFloored(_num) {
  return Math.floor(Math.random() * _num);
}
// return a floored percentage
function flooredPercent(_num) {
  return Math.floor(100 * _num);
}
// print debug
// the debug output on the web page is for mobile dev issues ( like no dev panel on chrome mobile)
function debug(message, special = "normal") {
  if (testMode) {

    switch (special) {
      case "infos":
        console.log('%c' + message, styleInfo);
        document.getElementById('output').innerHTML = ('<p><span style="' + styleInfo + '">' + String(message) + '</span></p>');
        break;
      case "alert":
        console.log('%c' + message, styleWarning);
        document.getElementById('output').innerHTML = ('<p><span style="' + styleWarning + '"><strong>' + String(message) + '</strong></span></p>');
        break;
      case "valide":
        console.log('%c' + message, styleValide);
        document.getElementById('output').innerHTML = ('<p><span style="' + styleValide + '">' + String(message) + '</span></p>');
        break;
      case "function":
        console.log('%c' + message, styleFunction);
        document.getElementById('output').innerHTML = ('<p><span style="' + styleFunction + '"><code>' + String(message) + '</code></span></p>');
        break;
      case "construc":
        console.log('%c' + message, styleConstruc);
        document.getElementById('output').innerHTML = ('<p><span style="' + styleConstruc + '"><code>' + String(message) + '</code></span></p>');
        break;
      case "methode":
        console.log('%c' + message, styleMethode);
        document.getElementById('output').innerHTML = ('<p><span style="' + styleMethode + '"><code>' + String(message) + '</code></span></p>');
        break;
      default:
        console.log(message);
        document.getElementById('output').innerHTML = ('<p>' + String(message) + '</p>');
    }
    // console.log(message);
    try {
      // for visual log confort
      // always reset the textfield focus on the last log
      var element = document.getElementById("output");
      element.scrollTop = element.scrollHeight;
    } catch (e) {
      // console.warn('no <output> element on DOM');
    }
  } else {
    // hide the out put if testMode is set to false
    $("#output").addClass("invisible");
    document.getElementById('output').innerHTML = ('');
  }
}

function output(message) {
  console.log(message);
  document.querySelector('#output p').innerHTML = (String(message));
}

hitTest = function(h, e){

  var rectObj = h.getBoundingClientRect();
  var rectTest = e.getBoundingClientRect();
 // heros
  var hX = rectObj.x;
  var hXw = rectObj.x + rectObj.width;
  var hY = rectObj.y ;
  var hYh = rectObj.y + rectObj.height;

  // enemis
  var eX = rectTest.x
  var eXw = rectTest.x + rectTest.width;
  var eY = rectTest.y
  var eYh = rectTest.y + rectTest.height;
  // debug('h:'+ rectObj.x +' e:'+ rectTest.x);

  if(hX<eX && hXw<eX)return false;
  if(hX>eXw && hXw>eXw)return false;
  if(hY<eY && hYh<eY)return false;
  if(hY>eYh && hYh>eYh)return false;
  return true;

};
