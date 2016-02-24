'use babel'

module.exports = {
  activate(state){
    setTimeout( () => {
      var SocketConnection = require('./SocketConnection');
      this.socketConnection = new SocketConnection().startServer();
    }, 3000);
  },
  deactivate(){
    this.socketConnection.stopServer();
  }
};
