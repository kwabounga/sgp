#!/usr/bin/env node
var connection;
var program = require('commander');
var fs = require('fs');
var sgp = require('../exports/bll/sgp_ctrlr');
var version = function(){
  return require('../package.json').version
}

// found application directory
let pathCurDir = '';
var p;
if (__dirname.lastIndexOf('/') != -1) {
  p = __dirname.lastIndexOf('/')
} else {
  p = __dirname.lastIndexOf('\\')
}
const DashBoard = require('@kwabounga/cli_dashboard');
const db = new DashBoard();

// get configuration in app directory
var conf ;
var confLoader = require('../exports/configuration');
confLoader.configuration(__dirname.slice(0, p) + '/conf/.conf',(data)=>{
  conf = data;
  // program
  if (!program.help && program.monitoring == null) {
    // displaying help
    let outputHelp = ''
    outputHelp += ('\n[SGP HELP] v.'+version()+'\n')
    outputHelp += ('\n$ sgp -[options:-m]\n')
    outputHelp += ('------------------------\n')
    // console.log(program.options)
    outputHelp += ('options:\n')
    program.options.forEach((elmt => {
      outputHelp += ( elmt.flags+ ':  '+ elmt.description +'\n')
    }))
    if(program.showconf == conf.admin_pass){
      outputHelp += ('\n------------------------\n')
      outputHelp += ('configuration: \n')
      outputHelp += ('%application-directory/conf/.conf:\n');
      let sortedConf = JSON.stringify(conf).replace(/,/gm,'\n').replace(/(\{)|(\})/gm, '');
      outputHelp += sortedConf;
      outputHelp += ('\n------------------------\n')
    }

    // create blocs
    let hb = outputHelp.split('\n').length + 2
    db.setScreen()
      .makeBloc('conf',0,0,db.cbs.bsbW(2),hb)
      .writeInBloc('conf',outputHelp)
    return;
  } else {
    if (program.monitoring == conf.admin_pass) {
      connection = require('../exports/dal/connection').connection(conf);
      // let db = new DashBoard();
      // create blocs
      db.setScreen()
        .makeBloc('head',0,0,db.cbs.bsbW(1),db.cbs.bsbH(6))
        .makeBloc('light',0,db.cbs.bsbH(6)-1,db.cbs.bsbW(6),db.cbs.bsbH(6))
        .makeBloc('temp',db.cbs.bsbW(6),db.cbs.bsbH(6)-1,db.cbs.bsbW(6),db.cbs.bsbH(6))
        .makeBloc('humi',0,(db.cbs.bsbH(6)*2)-1,db.cbs.bsbW(6),db.cbs.bsbH(6))
        .makeBloc('acid',db.cbs.bsbW(6),(db.cbs.bsbH(6)*2)-1,db.cbs.bsbW(6),db.cbs.bsbH(6))
        .makeBloc('nutr',0,(db.cbs.bsbH(6)*3)-1,db.cbs.bsbW(6),db.cbs.bsbH(6))
        .makeBloc('wate',db.cbs.bsbW(6),(db.cbs.bsbH(6)*3)-1,db.cbs.bsbW(6),db.cbs.bsbH(6))
        .makeBloc('vent',0,(db.cbs.bsbH(6)*4)-1,db.cbs.bsbW(3),db.cbs.bsbH(6))
        .makeBloc('bloc2',db.cbs.bsbW(3),db.cbs.bsbH(6)-1,db.cbs.bsbW(2),db.cbs.bsbH(3)*2)
        .makeBloc('bloc3',db.cbs.bsbW(3)+db.cbs.bsbW(2),db.cbs.bsbH(6)-1,db.cbs.bsbW(6),db.cbs.bsbH(3))
        .makeBloc('bloc4',db.cbs.bsbW(3)+db.cbs.bsbW(2),db.cbs.bsbH(3)+db.cbs.bsbH(6)-1,db.cbs.bsbW(6),db.cbs.bsbH(3))
        .makeBloc('foot',0,(db.cbs.bsbH(6)*5)-1,db.cbs.bsbW(1),db.cbs.bsbH(6))
        // first init
      db.writeInBloc('head', 'SGP MONITORING')
        .writeInBloc('light', '\nLIGHT\n'+sgp.infos('luminosity')+'')
        .writeInBloc('temp', '\nTEMP.\n'+sgp.infos('temperature')+'°')
        .writeInBloc('humi', '\nHUMI.\n'+sgp.infos('humidity')+'%')
        .writeInBloc('acid', '\nPH\n'+sgp.infos('acidity')+'')
        .writeInBloc('nutr', '\nLAST\n6h')
        .writeInBloc('wate', '\nLEVEL\n'+sgp.infos('water_level')+'%')
        .writeInBloc('vent', '\nVENT\nOFF')
        .writeInBloc('foot', 'do something or quit')
        .writeInBloc('bloc2', db.blocTextCutter('bloc2','bla'))
        .statInBloc('bloc3', {title:'humi. /100',values:[40,55,20,60,30,0,10,0,10,20,30,40,50,60,70,90,80],maxValue:100})
        .statInBloc('bloc4', {title:'size / 150',values:[10,15,20,25,30,45,50,60,70,100,110,120,130,130,140,142,145],maxValue:150});

        // events
        db.registrerEvent('space', ()=>{

// console.log('-'+db.ansie.cursorMove(-6))

          takePicture('bloc2');

          db.writeInBlocLooper('foot', '   Update infos     ', db, 1, 300, false,()=>{db.writeInBloc('foot', 'do something or quit')})
          .clearBloc('light').writeInBloc('light', '\nLIGHT\n'+sgp.infos('luminosity')+'')
          .clearBloc('temp').writeInBloc('temp', '\nTEMP.\n'+sgp.infos('temperature')+'°')
          .clearBloc('humi').writeInBloc('humi', '\nHUMI.\n'+sgp.infos('humidity')+'%')
          .clearBloc('acid').writeInBloc('acid', '\nPH\n'+sgp.infos('acidity')+'')
          .clearBloc('wate').writeInBloc('wate', '\nLEVEL\n'+sgp.infos('water_level')+'%')

          sgp.stats(connection,'temperature',25, (data,res)=>{
            // console.log(data)
            db.clearBloc('bloc3').statInBloc('bloc3',constructChartDatasetsFromData(data));
          })
          sgp.stats(connection,'humidity',25, (data,res)=>{
            // console.log(data)
            db.clearBloc('bloc4').statInBloc('bloc4',constructChartDatasetsFromData(data));
          })
        }).initKeyboardEvents();
    } else {
      console.log('run sgp -h  or sgp --help');
    }

  }
});
// let pjson =
// console.log(pjson);
// get options
program
  .version(version())
  .option('-m, --monitoring [admin_pass]', 'show monitoring in cli')
  .option('-c, --showconf [admin_pass]', 'show configuration vars')
  .option('-h, --help', 'help')
  .parse(process.argv);

var takePicture = function(blocName) {
  var asciify = require('image-asciify-cli');
  var options = {
    fit:    'box',
    width:  db.getBlocByName('bloc2').w-4,
    height: db.getBlocByName('bloc2').h-3
    // ,
    // custom_char: '.,~+*µ¤#O0@'
  }
  asciify(__dirname.slice(0, p) + '/img/sgp.png', options, function (err, asciified) {
    if (err) throw err;

    // Print to console
    db.clearBloc('bloc2')

    process.stdout.write(db.ansie.cursorTo(db.getBlocByName('bloc2').x+1, db.getBlocByName('bloc2').y+1) + asciified.replace(/\n/gm,db.ansie.cursorDown()+db.ansie.cursorTo((db.getBlocByName('bloc2').x+1))))
    // db.as
    // console.log(asciified);
  });
}
var constructChartDatasetsFromData = function(data) {
  // console.log(data)
  let stats = data;
  let statsKey = Object.keys(stats);
  // {title:'size / 150',values:[10,15,20,25,30],maxValue:150}
  let datasets = {};
  for (var i = 0; i < statsKey.length; i++) {
    let key = statsKey[i];
    // console.log('key:', key);
    if (key === "time_infos") continue;
    // console.log('chartColors', chartColors);
    let dataset = {};
    dataset.title = key;
    dataset.values = [];
    let maxv= 0;
    for (var j = 0; j < stats[key].length; j++) {
      dataset.values.push(stats[key][j]);
      if(stats[key][j] > maxv)maxv = stats[key][j];
    };
    dataset.maxValue = maxv;
    datasets.dataset = dataset;
  }
  // console.error("datasets", datasets.dataset);
  return datasets.dataset
}
