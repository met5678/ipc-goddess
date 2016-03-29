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


gsocket.ee.on('preset', function(data) {
  console.log('GOT PRESET',data);
  var buffer = new Buffer(12);
  buffer.fill(Number(data)|0);

  gsocket.emit('channels',buffer);
});