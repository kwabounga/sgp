const eventEmitter = require('events').EventEmitter;
module.exports = function(pin, type) {

  const dht = Object.create(new eventEmitter());
  function fakeEmit() {
		dht.emit('result', Math.random() * 30);
	}

}
