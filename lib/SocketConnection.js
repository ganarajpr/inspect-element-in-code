'use babel'

import socketio from 'socket.io';
import http from 'http';
import gotopath from './gotopath';
import startClient from './socketclient';
import client from 'socket.io-client';

const PORT = 5186;
export default class SocketConnection {
  constructor(){
    this.app = http.createServer();
    this.io = socketio(this.app);
    this.handleError();
  }

  startServer(){
    this.app.listen(PORT);
    this.io.on('connection', (socket) => {
      atom.notifications.addSuccess('Socket Client connected');
      socket.on('gotofile-data', (paths) => {
        console.log(paths);
        gotopath(paths);
        this.io.emit('gotofile-data',paths);
      });
    });
  }

  stopServer(){
    this.app.close();
  }

  handleError(){
    this.app.on('error',(e) => {
      if (e.code === 'EADDRINUSE') {
        // If Address is in use there is another instance
        // running a server.
        // Then start a client.
        console.log(e);
        this.startClient(PORT);
      }
      else{
        atom.notifications.addError('Error: ' + JSON.stringify(e));
      }
    });
  }

  startClient(){
    let socket = client.connect(`http://localhost:${PORT}`, {
      reconnect: false
    });
    socket.on('connect',() => {
      atom.notifications.addSuccess('Connected to other atom instance');
    });
    socket.on('disconnect',() => {
      atom.notifications.addError('Disconnected: Starting server');
      this.startServer();
    });
    socket.on('gotofile-data', (paths) => {
      gotopath(paths);
    });
  }

}
