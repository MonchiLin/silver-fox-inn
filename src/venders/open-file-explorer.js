// https://github.com/vibhor1997a/nodejs-open-file-explorer

import os from "os";
import {spawn} from "node:child_process";

function openExplorerinLinux(path, callback) {
  path = path || '/';
  let p = spawn('xdg-open', [path]);
  p.on('error', (err) => {
    p.kill();
    return callback(err);
  });
}

function openExplorerinWindows(path, callback) {
  path = path || '=';
  let p = spawn('explorer', [path]);
  p.on('error', (err) => {
    p.kill();
    return callback(err);
  });
}

function openExplorerinMac(path, callback) {
  path = path || '/';
  let p = spawn('open', [path]);
  p.on('error', (err) => {
    p.kill();
    return callback(err);
  });
}

let osType = os.type();

/**
 * Opens the Explorer and executes the callback function
 * @param {string} path The path string to be opened in the explorer
 * @param {Function} callback Callback function to which error is passed if some error occurs
 */
export function openExplorer(path, callback) {
  if (osType === 'Windows_NT') {
    openExplorerinWindows(path, callback);
  } else if (osType === 'Darwin') {
    openExplorerinMac(path, callback);
  } else {
    openExplorerinLinux(path, callback);
  }
}

