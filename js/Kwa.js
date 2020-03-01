/**
* "KWA Helpers methods for easy coding"
* @author: Jean-Yves Chaillou
* @version: 0.0.1
* @since: 02.02.19
* @see: https://github.com/kwabounga
* @type: GLOBAL OBJECT
*
* @contact: jeanyves.chaillou[at]gmail.com
* @usage: use KWA package to access to your favorite helper like KWA.trace('yourlog')
*/


/**
* @constructor  : Activating Global Object
*/
var KWA = KWA  || {

  /**
   * Convert a string in ascii code
   * @param  {String} - the String to convert
   * @return  {String} - the Converted String
   */
  codeAsciiConvertor : function ( strg ) {
    var ar = strg.split( '' );
    // console.log( 'ar:', ar );
    var txt = '';
    for ( var i = 0; i < ar.length; i++ ) {
      txt += strg.charCodeAt( i );
      if ( i != ar.length - 1 ) txt += '.';
    }
    return txt;
  },

  /**
   * Crypto encoding cypher
   * @param {String} - the text to encode
   * @param {Array} - the transpose Numbers [4,2,6]
   * @return {Type} - the encoded text
   */
  cryptoCipherizerEncrypt : function ( txt, transpo = [ 4, 2 ] ) {

    var ArAlph = KWA.textHelpers._alphabetshuff.split( '' );
    var ArTxt = txt.split( '' );
    var txtCrypted = '';
    var nbChara = ArAlph.length;

    var switchAr = 0;

    var arrTranspo;
    if ( Array.isArray( transpo ) ) {
      arrTranspo = transpo;
    } else {
      switch ( typeof transpo ) {
        case "string":
          arrTranspo = transpo.split( '' );
          break;
        case "number":
          arrTranspo = transpo.toString().split( '' );
          break;
        default:
          arrTranspo = [ 4, 2 ];
      }
    }
    // console.log(Array.isArray(arrTranspo));
    // console.table( arrTranspo );

    for ( var i = 0; i < ArTxt.length; i++ ) {
      var chara = ArTxt[ i ];
      // console.log(i, "ArTxt[i]", ArTxt[i])
      var pos = ArAlph.indexOf( chara );
      // console.log(i, "pos", pos)
      pos += parseInt( arrTranspo[ switchAr ] );
      // console.log(i, "parseInt( arrTranspo[ switchAr ] ); ",parseInt( arrTranspo[ switchAr ] ) );
      if ( pos >= nbChara ) pos -= nbChara;
      // console.log(i, "next pos",pos)
      txtCrypted += ArAlph[ pos ] + '';

      switchAr++;
      if ( switchAr == arrTranspo.length - 1 ) {
        switchAr = 0;
      }

    }

    return txtCrypted;

  },

  /**
   * Crypto decoding cypher reversed
   * @param {String} - the text to encode
   * @param {Array} - the transpose Numbers [4,2,6] // the same combinaison of numbers used to encode the txt
   * @return {Type} - the decoded text
   */
  cryptoCipherizerDecrypt : function ( txt, transpo = [ 4, 2 ] ) {

    var ArAlph = KWA.textHelpers._alphabetshuff.split( '' );
    var ArTxt = txt.split( '' );
    var txtDecrypted = '';
    var nbChara = ArAlph.length;
    var switchAr = 0;

    var arrTranspo;
    if ( Array.isArray( transpo ) ) {
      arrTranspo = transpo;
    } else {
      switch ( typeof transpo ) {
        case "string":
          arrTranspo = transpo.split( '' );
          break;
        case "number":
          arrTranspo = transpo.toString().split( '' );

          break;
        default:
          arrTranspo = [ 4, 2 ];
      }
    }
    // console.table( arrTranspo );

    for ( var i = 0; i < ArTxt.length; i++ ) {
      var chara = ArTxt[ i ];
      var pos = ArAlph.indexOf( chara );

      pos -= parseInt( arrTranspo[ switchAr ] );
      // console.log(parseInt( arrTranspo[ switchAr ] ));
      if ( pos <= 0 ) pos += nbChara;

      txtDecrypted += ArAlph[ pos ] + '';

      switchAr++;
      if ( switchAr == arrTranspo.length - 1 ) {
        switchAr = 0;
      }
    }

    return txtDecrypted;
  },

  /**
   * Tools to formating text with a nb of chara %2==0
   * @param {String} - the text to format
   * @return {String} - the formated text
   */
  formatText : function ( txt ) {
    if ( txt.length % 2 != 0 ) txt += ' ';
    return txt;
  },

  /**
   * Generator Function to give a uniq id
   * @param {String} - label
   * @return {String} - the String ID : Label+id
   * @example - var myID = KWA.giveID('label'); every myId.next() // return "label0" to "label999";
   */
  giveID : function* ( name ) {
    var i = 0;
    for ( var i = 0; i < 1000; i++ ) {
      let textId = name + i;
      yield textId;
    }
    return "end_" + name + "more than 1000 id please reinitialize gen. function";
  },

  /**
   * the customized log function
   * @param {rest} - what do you want to log
   * @description - log anything : using console.dir ; console.table ; or console.log
   * @optional - a div named "output" in the html to log whithout console;
   * @example - KWA.trace('anything you want', ["to","log"]);
   */
  trace : function ( ...logs ) {
    // TODO: faire un css embarqué pour la div output;
    KWA.logId = KWA.logId || KWA.giveID( "log: " );
    // console.log( "// KWA.trace %cbegin", "color: green; font-style: bold; background-color: black; padding: 2px" );
    if ( logs.length > 1 ) console.groupCollapsed( KWA.logId.next().value + ' ' + logs.toString() );
    for ( var i = 0; i < logs.length; i++ ) {
      if ( Array.isArray( logs[ i ] ) ) {

        console.table( logs[ i ] );
        console.log( logs[ i ] );

      } else if ( typeof logs[ i ] == 'string' || typeof logs[ i ] == 'number' ) {

        console.log( logs[ i ] );

      } else {

        // console.log( logs[ i ] );
        console.dir( logs[ i ] );

      }

    }
    var otpt = document.getElementById( 'output' );
    if ( otpt != null ) {
      otpt.style.color = 'white';
      otpt.style.backgroundColor = 'black';
      otpt.style.fontFamily = "Courier,Charcoal,sans-serif";
      for ( var i = 0; i < logs.length; i++ ) {
        otpt.appendChild( document.createTextNode( logs[ i ] ) );
        otpt.appendChild( document.createTextNode( "\n" ) );
      }
    }
    if ( logs.length > 1 ) console.groupEnd();
    // console.log( "// KWA.trace %cEND", "color: red; font-style: bold; background-color: black; padding: 2px" );
  },

  /**
   * Object textHelpers collection
   * @function KWA.textHelpers.blank(int) - generate a string whith n blank - @return {string}
   * @function KWA.textHelpers.logo() - generate a string whith KWA logo - @return {string}
   * @function KWA.textHelpers.copyright(String) - generate a nfo file with the name of the app - @return {string}
   */
  textHelpers : {
    _alphabet: 'ABCMqrstEFGHUV_ç567uvwcdeQRfgD89- !:/;JKLhijklmn.,?*ù$^NOPxyIop><&é"\'(-è34STz012WXYZabà)=',
    _alphabetshuff: "'Wu-0L:nù<qXH ?F;dKl_t$EOA&Gz7jpZàm3r-8YIgyhRak^,JBx>.s*v=6eU)çD!b1Q5(4TCéiS2/oMfNVc9wPè",
    _linegap: "\n",
    _space: " ",
    _spaceline: "        ",
    _star: "*",
    _starline: "**********",
    _dollar: "$",
    _dollarline: "$$$$$$$$$$",
    _kwa: "kWa",
    _fname: "Jean-Yves",
    _lname: "Chaillou",
    _mail: "jeanyves.chaillou@gmail.com",
    blank: function ( nbBlank ) {
      var bloc = '';
      for ( var k = 0; k < nbBlank; k++ ) {
        bloc += ' ';
      }
      return bloc;
    },
    logo: function () {
      let year = new Date().getFullYear()
      var logo = "";
      logo += '\n';
      logo += '╔══════════════════════════════════════════════════════════╗' + '\n';
      logo += '║                ██╗  ██╗██╗    ██╗ █████╗             ' + year + '║' + '\n';
      logo += '║                ██║ ██╔╝██║    ██║██╔══██╗                ║' + '\n';
      logo += '║                █████╔╝ ██║ █╗ ██║███████║                ║' + '\n';
      logo += '║                ██╔═██╗ ██║███╗██║██╔══██║                ║' + '\n';
      logo += '║                ██║  ██╗╚███╔███╔╝██║  ██║                ║' + '\n';
      logo += '║   Copyright®™  ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝  >kWa!         ║' + '\n';
      logo += '╚══════════════════════════════════════════════════════════╝' + '\n';
      return logo;
    },
    copyright: function ( mark ) {
      var cpr = "";
      // var d = new Date();

      cpr += KWA.textHelpers.logo();

      cpr += KWA.textHelpers._linegap;
      cpr += KWA.textHelpers._linegap;
      cpr += KWA.textHelpers._linegap;

      // cpr += writeInBloc(d.date.toString() + ' ' + d.month.toString() + ' ' + d.fullYear.toString());

      cpr += KWA.textHelpers._linegap;

      cpr += KWA.writeInBloc.title( mark );
      cpr += KWA.textHelpers._linegap;
      cpr += KWA.textHelpers._linegap;
      cpr += KWA.nfoAlphabet.word( '  ' + mark );
      cpr += KWA.textHelpers._linegap;
      cpr += KWA.textHelpers._linegap;

      cpr += KWA.writeInBloc.paragraphe( KWA.textHelpers._fname + ' ' + KWA.textHelpers._lname + ' @ ' + KWA.textHelpers._kwa );

      cpr += KWA.textHelpers._linegap;
      cpr += KWA.writeInBloc.paragraphe( KWA.codeAsciiConvertor( KWA.textHelpers._kwa ) );
      cpr += KWA.writeInBloc.paragraphe( KWA.textHelpers._mail );
      return cpr;
    }
  },
  /**
  * Object hackerAlphabet collection
  * @function KWA.hackerAlphabet.translate(string) - convert - revert string in "HackerMode/normalMode" - @return {string}
  * @example 1 - KWA.hackerAlphabet.translate("ce que je veux traduire") //return "СЭ 9ЦЭ 7Э ѴЭЦЖ ТЯДDЦ!ЯЭ"
  * @example 2 - KWA.hackerAlphabet.translate("СЭ 9ЦЭ 7Э ѴЭЦЖ ТЯДDЦ!ЯЭ") //return "ce que je veux traduire"
  */
  hackerAlphabet : {
    translate: function(txt){
      var hackerText = '';
      for (var i = 0; i < txt.length; i++) {
        switch (txt[i]) {
          case "Д":
            hackerText += "A";
            break;
          case "8":
            hackerText += "B";
            break;
          case "С":
            hackerText += "C";
            break;
          case "D":
            hackerText += 'D';
            break;
          case "Э":
            hackerText += "E";
            break;
          case "Г":
            hackerText += "F";
            break;
          case "9":
            hackerText += "G";
            break;
          case "µ":
            hackerText += "H";
            break;
          case "!":
            hackerText += "I";
            break;
          case "7":
            hackerText += "J";
            break;
          case "£":
            hackerText += "K";
            break;
          case "1":
            hackerText += "L";
            break;
          case "Щ":
            hackerText += "M";
            break;
          case "И":
            hackerText += "N";
            break;
          case "Ф":
            hackerText += "O";
            break;
          case "Ь":
            hackerText += "P";
            break;
          case "9":
            hackerText += "Q";
            break;
          case "Я":
            hackerText += "R";
            break;
          case "ʂ":
            hackerText += "S";
            break;
          case "Т":
            hackerText += "T";
            break;
          case "Ц":
            hackerText += "U";
            break;
          case "Ѵ":
            hackerText += "V";
            break;
          case "Щ":
            hackerText += "W";
            break;
          case "Ж":
            hackerText += "X";
            break;
          case "У":
            hackerText += "Y";
            break;
          case "2":
            hackerText += "Z";
            break;
          case "a":
          case "A":
            hackerText += "Д";
            break;
          case "b":
          case "B":
            hackerText += "8";
            break;
          case "c":
          case "C":
            hackerText += "С";
            break;
          case "d":
          case "D":
            hackerText += 'D';
            break;
          case "e":
          case "E":
            hackerText += "Э";
            break;
          case "f":
          case "F":
            hackerText += "Г";
            break;
          case "g":
          case "G":
            hackerText += "9";
            break;
          case "h":
          case "H":
            hackerText += "µ";
            break;
          case "i":
          case "I":
            hackerText += "!";
            break;
          case "j":
          case "J":
            hackerText += "7";
            break;
          case "k":
          case "K":
            hackerText += "£";
            break;
          case "l":
          case "L":
            hackerText += "1";
            break;
          case "m":
          case "M":
            hackerText += "Щ";
            break;
          case "n":
          case "N":
            hackerText += "И";
            break;
          case "o":
          case "O":
            hackerText += "Ф";
            break;
          case "p":
          case "P":
            hackerText += "Ь";
            break;
          case "q":
          case "Q":
            hackerText += "9";
            break;
          case "r":
          case "R":
            hackerText += "Я";
            break;
          case "s":
          case "S":
            hackerText += "ʂ";
            break;
          case "t":
          case "T":
            hackerText += "Т";
            break;
          case "u":
          case "U":
            hackerText += "Ц";
            break;
          case "v":
          case "V":
            hackerText += "Ѵ";
            break;
          case "w":
          case "W":
            hackerText += "Щ";
            break;
          case "x":
          case "X":
            hackerText += "Ж";
            break;
          case "y":
          case "Y":
            hackerText += "У";
            break;
          case "z":
          case "Z":
            hackerText += "2";
            break;
          case "0":
            hackerText += "0";
            break;
          case "1":
            hackerText += "1";
            break;
          case "2":
            hackerText += "2";
            break;
          case "3":
            hackerText += "3";
            break;
          case "4":
            hackerText += "4";
            break;
          case "5":
            hackerText += "5";
            break;
          case "6":
            hackerText += "6";
            break;
          case "7":
            hackerText += "7";
            break;
          case "8":
            hackerText += "8";
            break;
          case "9":
            hackerText += "9";
            break;
          case "!":
            hackerText += "!";
            break;
          case ".":
            hackerText += ".";
            break;
          case "?":
            hackerText += "?";
            break;
          case " ":
            hackerText += " ";
            break;

          default:
            hackerText += " ";
            break;

        }
      }
      return hackerText;
    }
  },
  /**
  * BIG CHARACTERS NFO TRANSLATER Collection
  * @member [a to z && 0-9 && !?.*] the characters collection
  * @function KWA.nfoAlphabet.letter(string) - @param {string} character - @return {string}
  * @function KWA.nfoAlphabet.word(string) - @param {string} string - generate a BIG WORD using KWA.nfoAlphabet.letter  - @return {string}
  */

  nfoAlphabet : {
    a: [
      [ " █████╗ " ],
      [ "██╔══██╗" ],
      [ "███████║" ],
      [ "██╔══██║" ],
      [ "██║  ██║" ],
      [ "╚═╝  ╚═╝" ]
    ],
    b: [
      [ "██████╗ " ],
      [ "██╔══██╗" ],
      [ "██████╔╝" ],
      [ "██╔══██╗" ],
      [ "██████╔╝" ],
      [ "╚═════╝" ]
    ],
    c: [
      [ " ██████╗" ],
      [ "██╔════╝" ],
      [ "██║     " ],
      [ "██║     " ],
      [ "╚██████╗" ],
      [ " ╚═════╝" ]
    ],
    d: [
      [ "██████╗ " ],
      [ "██╔══██╗" ],
      [ "██║  ██║" ],
      [ "██║  ██║" ],
      [ "██████╔╝" ],
      [ "╚═════╝ " ]
    ],
    e: [
      [ "███████╗" ],
      [ "██╔════╝" ],
      [ "█████╗  " ],
      [ "██╔══╝  " ],
      [ "███████╗" ],
      [ "╚══════╝" ]
    ],
    f: [
      [ "███████╗" ],
      [ "██╔════╝" ],
      [ "█████╗  " ],
      [ "██╔══╝  " ],
      [ "██║     " ],
      [ "╚═╝     " ]
    ],
    g: [
      [ " ██████╗ " ],
      [ "██╔════╝ " ],
      [ "██║  ███╗" ],
      [ "██║   ██║" ],
      [ "╚██████╔╝" ],
      [ " ╚═════╝ " ]
    ],
    h: [
      [ "██╗  ██╗" ],
      [ "██║  ██║" ],
      [ "███████║" ],
      [ "██╔══██║" ],
      [ "██║  ██║" ],
      [ "╚═╝  ╚═╝" ]
    ],
    i: [
      [ "██╗" ],
      [ "██║" ],
      [ "██║" ],
      [ "██║" ],
      [ "██║" ],
      [ "╚═╝" ]
    ],
    j: [
      [ "     ██╗" ],
      [ "     ██║" ],
      [ "     ██║" ],
      [ "██   ██║" ],
      [ "╚█████╔╝" ],
      [ " ╚════╝ " ]
    ],
    k: [
      [ "██╗  ██╗" ],
      [ "██║ ██╔╝" ],
      [ "█████╔╝ " ],
      [ "██╔═██╗ " ],
      [ "██║  ██╗" ],
      [ "╚═╝  ╚═╝" ]
    ],
    l: [
      [ "██╗     " ],
      [ "██║     " ],
      [ "██║     " ],
      [ "██║     " ],
      [ "███████╗" ],
      [ "╚══════╝" ]
    ],
    m: [
      [ "███╗   ███╗" ],
      [ "████╗ ████║" ],
      [ "██╔████╔██║" ],
      [ "██║╚██╔╝██║" ],
      [ "██║ ╚═╝ ██║" ],
      [ "╚═╝     ╚═╝" ]
    ],
    n: [
      [ "███╗   ██╗" ],
      [ "████╗  ██║" ],
      [ "██╔██╗ ██║" ],
      [ "██║╚██╗██║" ],
      [ "██║ ╚████║" ],
      [ "╚═╝  ╚═══╝" ]
    ],
    o: [
      [ " ██████╗ " ],
      [ "██╔═══██╗" ],
      [ "██║   ██║" ],
      [ "██║   ██║" ],
      [ "╚██████╔╝" ],
      [ " ╚═════╝ " ]
    ],
    p: [
      [ "██████╗ " ],
      [ "██╔══██╗" ],
      [ "██████╔╝" ],
      [ "██╔═══╝ " ],
      [ "██║     " ],
      [ "╚═╝     " ]
    ],
    q: [
      [ " ██████╗ " ],
      [ "██╔═══██╗" ],
      [ "██║   ██║" ],
      [ "██║▄▄ ██║" ],
      [ "╚██████╔╝" ],
      [ " ╚══▀▀═╝ " ]
    ],
    r: [
      [ "██████╗ " ],
      [ "██╔══██╗" ],
      [ "██████╔╝" ],
      [ "██╔══██╗" ],
      [ "██║  ██║" ],
      [ "╚═╝  ╚═╝" ]
    ],
    s: [
      [ "███████╗" ],
      [ "██╔════╝" ],
      [ "███████╗" ],
      [ "╚════██║" ],
      [ "███████║" ],
      [ "╚══════╝" ]
    ],
    t: [
      [ "████████╗" ],
      [ "╚══██╔══╝" ],
      [ "   ██║   " ],
      [ "   ██║   " ],
      [ "   ██║   " ],
      [ "   ╚═╝   " ]
    ],
    u: [
      [ "██╗   ██╗" ],
      [ "██║   ██║" ],
      [ "██║   ██║" ],
      [ "██║   ██║" ],
      [ "╚██████╔╝" ],
      [ " ╚═════╝ " ]
    ],
    v: [
      [ "██╗   ██╗" ],
      [ "██║   ██║" ],
      [ "██║   ██║" ],
      [ "╚██╗ ██╔╝" ],
      [ " ╚████╔╝ " ],
      [ "  ╚═══╝  " ]
    ],
    w: [
      [ "██╗    ██╗" ],
      [ "██║    ██║" ],
      [ "██║ █╗ ██║" ],
      [ "██║███╗██║" ],
      [ "╚███╔███╔╝" ],
      [ " ╚══╝╚══╝ " ]
    ],
    x: [
      [ "██╗  ██╗" ],
      [ "╚██╗██╔╝" ],
      [ " ╚███╔╝ " ],
      [ " ██╔██╗ " ],
      [ "██╔╝ ██╗" ],
      [ "╚═╝  ╚═╝" ]
    ],
    y: [
      [ "██╗   ██╗" ],
      [ "╚██╗ ██╔╝" ],
      [ " ╚████╔╝ " ],
      [ "  ╚██╔╝  " ],
      [ "   ██║   " ],
      [ "   ╚═╝   " ]
    ],
    z: [
      [ "███████╗" ],
      [ "╚══███╔╝" ],
      [ "  ███╔╝ " ],
      [ " ███╔╝  " ],
      [ "███████╗" ],
      [ "╚══════╝" ]
    ],
    _0: [
      [ " ██████╗ " ],
      [ "██╔═████╗" ],
      [ "██║██╔██║" ],
      [ "████╔╝██║" ],
      [ "╚██████╔╝" ],
      [ " ╚═════╝ " ]
    ],
    _1: [
      [ " ██╗" ],
      [ "███║" ],
      [ "╚██║" ],
      [ " ██║" ],
      [ " ██║" ],
      [ " ╚═╝" ]
    ],
    _2: [
      [ "██████╗ " ],
      [ "╚════██╗" ],
      [ " █████╔╝" ],
      [ "██╔═══╝ " ],
      [ "███████╗" ],
      [ "╚══════╝" ]
    ],
    _3: [
      [ "██████╗ " ],
      [ "╚════██╗" ],
      [ " █████╔╝" ],
      [ " ╚═══██╗" ],
      [ "██████╔╝" ],
      [ "╚═════╝ " ]
    ],
    _4: [
      [ "██╗  ██╗" ],
      [ "██║  ██║" ],
      [ "███████║" ],
      [ "╚════██║" ],
      [ "     ██║" ],
      [ "     ╚═╝" ]
    ],
    _5: [
      [ "███████╗" ],
      [ "██╔════╝" ],
      [ "███████╗" ],
      [ "╚════██║" ],
      [ "███████║" ],
      [ "╚══════╝" ]
    ],
    _6: [
      [ " ██████╗ " ],
      [ "██╔════╝ " ],
      [ "███████╗ " ],
      [ "██╔═══██╗" ],
      [ "╚██████╔╝" ],
      [ " ╚═════╝ " ]
    ],
    _7: [
      [ "███████╗" ],
      [ "╚════██║" ],
      [ "    ██╔╝" ],
      [ "   ██╔╝ " ],
      [ "   ██║  " ],
      [ "   ╚═╝  " ]
    ],
    _8: [
      [ " █████╗ " ],
      [ "██╔══██╗" ],
      [ "╚█████╔╝" ],
      [ "██╔══██╗" ],
      [ "╚█████╔╝" ],
      [ " ╚════╝ " ]
    ],
    _9: [
      [ " █████╗ " ],
      [ "██╔══██╗" ],
      [ "╚██████║" ],
      [ " ╚═══██║" ],
      [ " █████╔╝" ],
      [ " ╚════╝ " ]
    ],
    _exc: [
      [ "██╗" ],
      [ "██║" ],
      [ "██║" ],
      [ "╚═╝" ],
      [ "██╗" ],
      [ "╚═╝" ]
    ],
    _dot: [
      [ "   " ],
      [ "   " ],
      [ "   " ],
      [ "   " ],
      [ "██╗" ],
      [ "╚═╝" ]
    ],
    _space: [
      [ "   " ],
      [ "   " ],
      [ "   " ],
      [ "   " ],
      [ "   " ],
      [ "   " ]
    ],
    _int: [
      [ "██████╗ " ],
      [ "╚════██╗" ],
      [ "  ▄███╔╝" ],
      [ "  ▀▀══╝ " ],
      [ "  ██╗   " ],
      [ "  ╚═╝   " ]
    ],_star: [
      [ "   ██╗   " ],
      [ " ██████╗ " ],
      [ " ╚═██╔═╝ " ],
      [ "   ╚═╝   " ],
      [ "         " ],
      [ "         " ]
    ],
    letter: function ( ltr ) {
      switch ( ltr ) {
        case "a":
        case "A":
          return KWA.nfoAlphabet.a;
          break;
        case "b":
        case "B":
          return KWA.nfoAlphabet.b;
          break;
        case "c":
        case "C":
          return KWA.nfoAlphabet.c;
          break;
        case "d":
        case "D":
          return KWA.nfoAlphabet.d;
          break;
        case "e":
        case "E":
          return KWA.nfoAlphabet.e;
          break;
        case "f":
        case "F":
          return KWA.nfoAlphabet.f;
          break;
        case "g":
        case "G":
          return KWA.nfoAlphabet.g;
          break;
        case "h":
        case "H":
          return KWA.nfoAlphabet.h;
          break;
        case "i":
        case "I":
          return KWA.nfoAlphabet.i;
          break;
        case "j":
        case "J":
          return KWA.nfoAlphabet.j;
          break;
        case "k":
        case "K":
          return KWA.nfoAlphabet.k;
          break;
        case "l":
        case "L":
          return KWA.nfoAlphabet.l;
          break;
        case "m":
        case "M":
          return KWA.nfoAlphabet.m;
          break;
        case "n":
        case "N":
          return KWA.nfoAlphabet.n;
          break;
        case "o":
        case "O":
          return KWA.nfoAlphabet.o;
          break;
        case "p":
        case "P":
          return KWA.nfoAlphabet.p;
          break;
        case "q":
        case "Q":
          return KWA.nfoAlphabet.q;
          break;
        case "r":
        case "R":
          return KWA.nfoAlphabet.r;
          break;
        case "s":
        case "S":
          return KWA.nfoAlphabet.s;
          break;
        case "t":
        case "T":
          return KWA.nfoAlphabet.t;
          break;
        case "u":
        case "U":
          return KWA.nfoAlphabet.u;
          break;
        case "v":
        case "V":
          return KWA.nfoAlphabet.v;
          break;
        case "w":
        case "W":
          return KWA.nfoAlphabet.w;
          break;
        case "x":
        case "X":
          return KWA.nfoAlphabet.x;
          break;
        case "y":
        case "Y":
          return KWA.nfoAlphabet.y;
          break;
        case "z":
        case "Z":
          return KWA.nfoAlphabet.z;
          break;
        case "0":
          return KWA.nfoAlphabet._0;
          break;
        case "1":
          return KWA.nfoAlphabet._1;
          break;
        case "2":
          return KWA.nfoAlphabet._2;
          break;
        case "3":
          return KWA.nfoAlphabet._3;
          break;
        case "4":
          return KWA.nfoAlphabet._4;
          break;
        case "5":
          return KWA.nfoAlphabet._5;
          break;
        case "6":
          return KWA.nfoAlphabet._6;
          break;
        case "7":
          return KWA.nfoAlphabet._7;
          break;
        case "8":
          return KWA.nfoAlphabet._8;
          break;
        case "9":
          return KWA.nfoAlphabet._9;
          break;
        case "!":
          return KWA.nfoAlphabet._exc;
          break;
        case ".":
          return KWA.nfoAlphabet._dot;
          break;
        case "?":
          return KWA.nfoAlphabet._int;
          break;
        case " ":
          return KWA.nfoAlphabet._space;
          break;
          case "*":
            return KWA.nfoAlphabet._star;
            break;

        default:
          return KWA.nfoAlphabet._space;
          break;
      }
    },
    word: function ( myWord ) {
      let ar = myWord;
      let nfoWord = '';
      const letterLine = 6;
      for ( var i = 0; i < letterLine; i++ ) {
        let rawLetter = ''; // ligne
        for ( var j = 0; j < ar.length; j++ ) {
          //Letter
          for ( var k = 0; k < KWA.nfoAlphabet.letter( ar[ j ] )[ i ].length; k++ ) { //LetterLigne of letter Array
            //Cell
            rawLetter += KWA.nfoAlphabet.letter( ar[ j ] )[ i ][ k ];
            // console.log(rawLetter);
          }
          // KWA.nfoAlphabet.word(ar[j])[i]
        }
        nfoWord += rawLetter;
        nfoWord += "\n";

      }
      return nfoWord;
    }
  },
  /**
  * for write a remarquable text !
  * @function KWA.writeInBloc.paragraphe(string) - @param {string} "any string" - @return {string} the string in the center of stars
  * @return {Type} - the description
  */

  writeInBloc : {
    paragraphe: function ( ...rest ) {
      var allSentences = rest;
      var bloc = "\n";
      var linesize = 60;
      bloc += "************************************************************"
      bloc += '\n';
      for ( var i = 0; i < allSentences.length; i++ ) {
        var txt = KWA.formatText( allSentences[ i ] );
        bloc += '*';
        var nbspaces = Math.ceil( ( ( linesize - txt.length ) - 2 ) / 2 );
        for ( var j = 0; j < nbspaces; j++ ) {
          bloc += ' ';
        }
        bloc += txt;
        for ( var k = 0; k < nbspaces; k++ ) {
          bloc += ' ';
        }
        bloc += '*';
        bloc += '\n';
      }
      bloc += "************************************************************";
      return bloc;
    },

    title: function ( text, centered = true, _maxChara = 60 ) {
      const maxChara = _maxChara;
      var blocSize = text.length + 4;
      var txt = "\n";

      if ( centered ) txt += KWA.textHelpers.blank( Math.ceil( ( maxChara - blocSize ) / 2 ) )
      for ( var i = 0; i < blocSize; i++ ) {
        txt += KWA.textHelpers._star;
      }

      txt += KWA.textHelpers._linegap;
      if ( centered ) txt += KWA.textHelpers.blank( Math.ceil( ( maxChara - blocSize ) / 2 ) )
      txt += KWA.textHelpers._star + KWA.textHelpers._space + text + KWA.textHelpers._space + KWA.textHelpers._star;
      txt += KWA.textHelpers._linegap;

      if ( centered ) txt += KWA.textHelpers.blank( Math.ceil( ( maxChara - blocSize ) / 2 ) )
      for ( var ii = 0; ii < blocSize; ii++ ) {
        txt += KWA.textHelpers._star;
      }

      return txt;
    }

  },
  /**
  * KWA.tools // des outils utils
  * @function KWA.tools.texts.shufflize(string,number) - @param {string} "string set" - @param {number} facultatif  a new length to truncate string nothing to keep the same size- @return {string} the shufflelized (truncated) string in the center of stars
  * @function KWA.tools.texts.changeLetterAt(string,string,integer) - @param {string} "string set" - @param {string} - the new chara - @param {integer} - where the new letter gone @return {string} - the new string set
  * @function KWA.tools.texts.matrixifize(integer,string,integer,function,domElement) - @param {integer} - nbRains - @param {string} - charaSet - @param {integer} - the grid size @param {function} - callBack updater @param {domElement} facultatif - the div id
  * @function KWA.tools.texts.matrixTfUpdater(nbRains,charaSets,setsPositions,gridSize,id,output) //CallBack to Update the matrix effect on the textField
  */
  tools : {
    texts: {
      shufflize: function(txt, sizeSet=-1){
        // console.log(txt.length);
        var leftSet = txt;
        var newSet = '';

        var currentIndex = (sizeSet == -1)?txt.length:sizeSet;
        var randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
            // console.log(currentIndex)
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * leftSet.length);
            currentIndex -= 1;
            let chara = leftSet.charAt(randomIndex);
            let tmpSet = leftSet.substring(0,randomIndex);
            tmpSet += leftSet.substring(randomIndex+1,leftSet.length);
            leftSet = tmpSet;

            newSet += chara;

          }
          return newSet;
        },
        changeLetterAt: function(charaSet, letter, index){
          var set = charaSet+'';
          var begin = set.substring(0,index);
          var end = set.substring(index+1, charaSet.length);
          console.log("set: "+ set,"length: "+charaSet.length,"Position: " + index, "select: "+ begin+"["+charaSet.charAt(index)+"]"+end ,"replace: " + letter,"new: "+ begin+"["+letter+"]"+end);
          return begin + letter + end;

        }

      },

    net: {
      ajaxGet: function( url, callback ) {
        var req = new XMLHttpRequest();
        req.open( "GET", url );
        req.addEventListener( "load", function () {
          if ( req.status >= 200 && req.status < 400 ) {
            console.log( url + ' ...loaded' );
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback( req.responseText );
          } else {
            console.error( req.status + " " + req.statusText + " " + url );
          }
        } );
        req.addEventListener( "error", function () {
          console.error( "Erreur réseau avec l'URL " + url );
        } );
        req.send( null );
      },
      ajaxPost: function( url, data, callback, isJson = false ) {
        var req = new XMLHttpRequest();
        req.open( "POST", url );
        req.addEventListener( "load", function () {
          if ( req.status >= 200 && req.status < 400 ) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback( req.responseText );
          } else {
            console.error( req.status + " " + req.statusText + " " + url );
            callback( 'error' );
          }
        } );
        req.addEventListener( "error", function () {
          console.error( "Erreur réseau avec l'URL " + url );
          callback( 'error' );
        } );
        if ( isJson ) {
          // Définit le contenu de la requête comme étant du JSON
          req.setRequestHeader( "Content-Type", "application/json" );
          // Transforme la donnée du format JSON vers le format texte avant l'envoi
          data = JSON.stringify( data );
        }
        req.send( data );
      }
    },
    graphics : {
      hitTest: function(elmt1, elmt2){
        var rectObj = elmt1.getBoundingClientRect();
        var rectTest = elmt2.getBoundingClientRect();
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

        if(hXw<eX || hX>eXw)return false;
        if(hYh<eY || hY>eYh)return false;
        return true;
      }
    },
    math:{
      randomSet(nb){
        var set = '';
        var tmpSet = [];
        for (var i = 0; i < nb; i++) {
          set += i;
        }
        var newSet = KWA.tools.texts.shufflize(set);
        return newSet;

      }
    },
    generate:{
      html:{
        div(_id=null, _class=null, _container=null){

          var dv = document.createElement("div");
          if(_id != null)dv.id = _id;
          if(_class != null)dv.className = _class;
          if(_container != null)_container.appendChild(dv);

          return dv;
        }
      }
    }

  },

  gameEngine : {
    _container:null,
    world : function (container) {
      KWA.gameEngine._container = KWA.gameEngine._container == null ?document.getElementById(container):KWA.gameEngine._container;
      return KWA.gameEngine._container;
    }

  }

};
