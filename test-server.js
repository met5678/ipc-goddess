var gsocket = require('./main');

var config = {
  id: 'comm-goddess',
  outputs: [
    'preset'
  ]
};

gsocket.initSocket(config);

var counter = 0;
setInterval(function() {
  gsocket.emit('preset', counter);
  counter = (counter+1)%256;
}, 15);