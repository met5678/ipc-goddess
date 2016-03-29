var gsocket = require('./main');

var config = {
  id: 'light-goddess',
  inputs: {
    'preset': 'comm-goddess'
  },
  outputs: [
    'channels'
  ]
};

gsocket.initSocket(config);


gsocket.on('preset', function(data) {
  var buffer = new Buffer(3);
  buffer.fill(Number(data)|0);
  gsocket.emit('channels',buffer);
});