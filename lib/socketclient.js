'use babel'
import ws from 'socket.io-client';
import gotopath from './gotopath';
export default function startClient(port){
  let socket = ws(`http://localhost:${port}`)
  socket.on('connect',() => {
    atom.notifications.addSuccess('Connected to other atom instance');
  });
  socket.on('disconnect',() => {
    atom.notifications.addError('Disconnected');
  });
  socket.on('gotofile-data', (paths) => {
    gotopath(paths);
  });
}
