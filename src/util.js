export function basename(path) {
  return path.split('/').pop();
}

export function dirname(path) {
  return path.replace(/\/[^\/]*$/, '');
}

export function preventDefaultWrap(callback) {
  // In the future this could take args
  return function(e) {
    e.preventDefault();
    callback();
  }
}
