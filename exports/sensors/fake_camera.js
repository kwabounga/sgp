class PiCamera {
  constructor(config) {
    var p;
    if (__dirname.lastIndexOf('/') != -1) {
      p = __dirname.lastIndexOf('/')
    } else {
      p = __dirname.lastIndexOf('\\')
    }
    // Ensure config is an object
    config = config || {output: (__dirname.slice(0, p) + '/img/cam1/hackerman.jpg')};
  }

  /*
  * Getter
  */
  get(prop) {
    if (!this.config[prop]) {
      throw new Error(`${ prop } isn't set on current object!`);
    }

    return this.config[prop];
  }

  /*
  * Setter
  */
  set(prop, value) {
    this.config[prop] = value;

    return this.config[prop];
  }

  // Take a picture
  snap() {
    if (this.mode !== 'photo') {
      throw new Error(`snap() can only be called when Pi-Camera is in 'photo' mode`);
    }

    return new Promise((resolve, reject) => {

        if (error) {
          reject(error);
        }
        resolve(this.config.output);

    });
  }
}


module.exports = PiCamera;
