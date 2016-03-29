var gsocket = require('./main');

var config = {
  id: 'dmx-goddess',
  inputs: {
    'channels': 'light-goddess'
  }
};

gsocket.initSocket(config);

gsocket.ee.on('channels', function(data) {
  console.log('GOT CHANNELS');
});