'use babel'
import pathex from 'node-path-extras';
import path from 'path';

export default function gotopath(paths){
    if(!paths.length || typeof paths[0] !== 'string') {
      atom.notifications.addError(`Browser did not send source path:
        Perhaps you did not add babel-plugin-transform-jsx-include-source ?
        `);
      return;
    }
    atom.project.rootDirectories.forEach( (rd) => {
      let projectPath = rd.path;
      if (pathex.along(paths[0], projectPath)) {
        let rel = path.relative(projectPath, paths[0]);
        atom.workspace.open(paths[0]);
        atom.show();
      }
    });
}
