# ipc-goddess

This provides the IPC socket that all goddess apps on the same machine use to communicate with one another. For communications over the network, see _comm-goddess_.

Usage:
```js

var config = {
  id: 'light-goddess',
  inputs: {
    'preset': 'comm-goddess'
  },
  outputs: [
    'channels'
  ]
};

ipcGoddess.initSocket(config);
ipcGoddess.emit('channels','Channel data');
ipcGoddess.on('preset', (data) => { console.log(data) });
```