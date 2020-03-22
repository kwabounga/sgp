![NODEJS](./doc/svg/Node.js_logo2.svg)  
![RPI](./doc/svg/raspberry+pi+horizontal.svg)
![SGP](./doc/svg/vectorpaint.svg)

# ***Super Green Project***



*ou projet* ***super green***  

système de gestion et controle de culture inDoor automatisé  
à terme:  
software  
* Dashboard / Overview client en local avec electron
* Serveur de controles, relevés avec scénarios
* API rest pour l'interface serveur / client  
* BDD pour l'historique des relevés et overview
hardware  
* Machine de controle ( rpi, sensors, caméra, et controleurs d'alimentation eau / électricité)
* systeme hydro

## Prérequis
Pour utiliser le systeme il vous faudra  

Coté hardware  
* rpi Modele 3
* capteur humidité / temprérature dht11
* quelques led
* capteur de niveau d'eau
* capteur acidité
* lister les autres capteurs ...
* switch/ controleur alimentation x3
* switch / debit d'eau / valve x2

Coté software  
*sur le rpi*

* node ^10.0.0 et npm
* maradb

*sur l'ordinateur de controle*
* node ^10.0.0 et npm

Pour les tests sgp_srv reconnait l'environneemnt et peut aller se connecter a une base de donneé mysql et va simuler les relever au lieu d'interroger les capteurs  

### Utilisation  
Apres avoir finit de faire le montage du systeme  
Récupérer le projet sur git  
*sur le RPI*
```sh
git clone https://github/kwabounga/sgp
```
* installer mariadb
* entrez les infos de configuration ip pwd ect

naviguer dans le dossier *./sgp/*  
créer un fichier ./conf/.conf
et taper:  

```sh
npm install
npm run server
# pour démarrer le serveur sur le raspberry  
```
*sur le PC local*
```sh
git clone https://github/kwabounga/sgp
```
* installer mysql pour les test sinon pas la peine
* entrez les infos de configuration ip pwd ect

naviguer dans le dossier *./sgp/*  
créer un fichier ./conf/.conf

```sh
npm install
npm start
# ouvre le module de monitoring sur un pc (app electron)
```  

Ajout de la commande
```sh
npm run all
# lance srv et monitoring (pour tests en local)
```

Creation de la commande 'sgp'

```sh
# installation
$ cd ..../sgp/
$ npm link
> done
```
A partir de là si un access en ssh vers le rpi est configuré
un monitoring en ligne de commande est possible

```sh
$ sgp -V
# numero de version
$ sgp -h
# affiche l'aide
$ sgp -h -c [pwd]
# affiche l'aide et la configuration
$ sgp -m [pwd]
# affiche le monitoring en ligne de commandes
```



# partie technique

## TODO utile:  
pour la creation post installe ds la dbb directement??
```js
  const exec = require('child_process').exec, child;
  const myShellScript = exec('sh doSomething.sh /myDir');
  myShellScript.stdout.on('data', (data)=>{
      console.log(data);
      // do whatever you want here with data
  });
  myShellScript.stderr.on('data', (data)=>{
      console.error(data);
  });
```
### BDD
l'application utilise une base de donnée mySql (local) / mariadb (rpi) pour  
* récupérer la configuration des scenarios
* enregistrer les relevés
* enregistrer les liens/id/informations? des photos

### Modules
Description des modules et utilisation / personnalisation
intégration du dashboard pour le monitoring cli


#### configuration.js

outils perso pour la recuperation et l'instenciation de la configuration
usage :

*créer le fichier ***./conf/.conf*** avec les bonnes infos:*
```conf
rest_url:localhost
rest_port:4000
db_url:localhost
db_port:3306
db_name:db_name
db_user:username
db_pwd:password

log_file:./log/sgp-logs.log
err_file:./log/sgp-exceptions.log

admin_pass:admin
```

*Charger la configuration:*
```js
require('./exports/configuration.js').configuration('./conf/.conf', (conf) => {
  // callBack with configuration object data
  /*
  conf :
  {
    rest_url: 'localhost',
    rest_port: '4000',
    db_url: 'localhost',
    db_port: '3306',
    db_name: 'db_name',
    db_user: 'username',
    db_pwd: 'password'
  }
  */
});
```

#### rest.js

le serveur à une api rest

1. permet de questionner le serveur sur les actions possible à effectuer
1. permet de questionner le serveur, et de recupérer des relevés sur les capteurs  
1. permet d'effectuer des tâches simples à distance via l'application 'back office'

**les infos a recuperer:**
* temperature
* acidité
* humidité
* motitoring global
* photos

**les tâches à effectuer:**
* envoyer/couper l'eau
* allumer/couper la ventilation
* prendre une photo
* allumer / couper la lumière
* ...

#### session.js

créer un code de securité pour pouvoir executer des commandes spécifiques via API REST  

```js
let code = require('./session.js');
code.getCode(); // renvoi le code
```


#### connection.js

connection à la base de donnée  
renvoi une connection prête à executer des queries

```js
  let con = require('./connection.js').connection(conf);

  con.query('SELECT * FROM TABLE',(err,results, fields)=>{}))
  con.query('SELECT * FROM TABLE where age =? AND color=?',[21,'blue'],(err,results, fields)=>{})
```

#### sgp_machines.js

Acces aux differents capteurs du Raspberry  
`// TODO: voir pour le renommer en 'sgp_sensors'`

```js
var sgp_machines = require('./sgp_machines.js');

sgp_machines.temperature() // renvoi la temperature
sgp_machines.acidity() // renvoi le ph de l'eau
sgp_machines.humidity() // renvoi l'humidité de l'air
sgp_machines.water_level() // renvoi le niveau d'eau
sgp_machines.luminosity() // renvoi l'état des lumieres
```


#### sgp_monitoring.js

Moteur du Serveur  
s'occupe d'effectuer des relevés regulièrement et effectuer des tâches en conséquence  
Les tâches sont paramétrées dans la base de données dans la table 'scenarios'

utilisation:

```js
// on récupere l'objet Monitoring
var Monitoring = require('./exports/sgp_monitoring');
// instanciation de l'objet en lui passant le nom du scenario, et la configuration en parametres
let mon = new Monitoring('default',conf);

// initialisation du monitoring
mon.init(() => {
  // une fois connecté et configuré
  // on est pret a lui faire faire des tâches
  mon.overview(); // apercus de la configuration (scenario)
  mon.start(); // Démarrage du Monitoring
  mon.summary(); // renvoi préleve les infos sur tous les capteurs et renvoi le resultat
});
```
`// TODO: faire une methode pour stopper le Monitoring`  

![SGPTINY](./doc/svg/preview.svg)


## Raspberry spécificités

#### GPIO
![GPIO](./doc/svg/gpiopinsv3.svg)
![GPIO](./doc/svg/gpiopinsv3withpi.svg)
#### RPI
![RPI](./doc/svg/RaspberryPi_3B.svg)
#### Beadboard
![Beadboard](./doc/svg/Beadboard.svg)
![BeadboardExplanations](./doc/Breadboard_Remarked_grande.png.webp)
