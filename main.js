"use strict";

const ipc    = require('node-ipc');
const events = require('events');
//const nconf  = require('nconf');

const ee = new events.EventEmitter();
//nconf.argv().env();


var baseConfig = {
  id: 'light-goddess',
  inputs: {
    'control': 'comm-goddess',
    'beat'   : 'comm-goddess'
  },
  outputs: [
    'channels'
  ]
};

var subscriptions = {}

function initSocket(config) {
  if(config.outputs) {
    for(let output of config.outputs) {
      subscriptions[output] = [];
    }

    ipc.config.id = config.id;

    ipc.serve(function() {
      ipc.server.on('subscribe', function(data, socket) {
        if(subscriptions[data]) {
          subscriptions[data].push(socket);
        }
      });
      ipc.server.on('disconnect', function(data, socket) {
        console.log('DISCONNECT', data, socket);
      });
      ipc.server.on('error', function(data, socket) {
        console.log('ERROR', data, socket);
      });
    });

    ipc.server.start();
  }

  if(config.inputs) {
    for(let type in config.inputs) {
      let server = config.inputs[type];
      if(ipc.of[server]) {
        ipc.of[server].emit('subscribe',type);
        ipc.of[server].on(type, function(data) {
          ee.emit(type,data);
        });
      }
      ipc.connectTo(server, function() {
        ipc.of[server].on('connect', function() {
          ipc.of[server].emit('subscribe',type);
        });
        ipc.of[server].on(type, function(data) {
          ee.emit(type,data);
        });
      })
    }
  }
}

function emit(type,data) {
  if(subscriptions[type]) {
    for(let socket of subscriptions[type]) {
      console.log('SENDING '+type); 
      ipc.server.emit(socket, type, data);
    }
  }
};

module.exports = {
  initSocket: initSocket,
  emit:       emit,
  ee:         ee 
};