var gsocket = require('./main');

var config = {
  id: 'dmx-goddess',
  inputs: {
    'channels': 'light-goddess'
  }
};

gsocket.initSocket(config);

gsocket.on('channels', function(data) {
});