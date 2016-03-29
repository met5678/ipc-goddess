# ipc-goddess

This provides the IPC socket that all goddess apps on the same machine use to communicate with one another. For communications over the network, see _comm-goddess_.

Usage:
```js
var ipc = require('ipc-goddess');

var config = {
  id: 'light-goddess',
  inputs: {
    'preset': 'comm-goddess'
  },
  outputs: [
    'channels'
  ]
};

ipc.initSocket(config);
ipc.emit('channels','Channel data');
ipc.on('preset', (data) => { console.log(data) });
```