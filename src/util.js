export function basename(path) {
  return path.split('/').pop();
}

export function dirname(path) {
  return path.replace(/\/[^\/]*$/, '');
}
