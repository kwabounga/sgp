const { app, BrowserWindow,Tray } = require('electron')

let win
// let appIcon
function createWindow () {
  // Creer la fenetre du navigateur.
  // appIcon = new Tray('./heroku.png')
  win = new BrowserWindow({
    show:false,
    width: 800,
    height: 580,
    x: 0,
    y: 40,
    // type: 'toolbar',
    // skipTaskbar: true,
    hasShadow: true,
    resizable: true,
    // transparent: true,
    // frame: false, // masque les contours : voir l'option drag dans le css pour les zone draguable
    // alwaysOnTop: true, // permet a la fenetre de rester toujours au dessus des autres
    // kiosk: true, // affiche l'app en plein ecran et empeche la mise en veille de l'ordinateur ( youtube )
    // titleBarStyle: 'customButtonsOnHover', frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // charge la page d'acceuil de l'app
  win.loadFile('html/index.html')
  // affiche proprement l'app ( sans voir le chargement )
  win.once('ready-to-show', () => {
    win.show()
    console.log(require('os').hostname())
  })
  // appIcon.on('click', function(){
  //   console.log('TRAYYY', win.isAlwaysOnTop())
  //   // for (prop in win) {
  //   //   console.log('prop:', prop)
  //   // }
  //   win.setAlwaysOnTop(!win.isAlwaysOnTop())
  // })
}
// créer la fenêtre une fois qu'electron est chargé
app.on('ready', createWindow)
