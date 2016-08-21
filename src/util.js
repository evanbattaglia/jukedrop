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

export function tryNTimes(promiseMaker, description, nTimes) {
  if (!nTimes || nTimes <= 1) {
    return promiseMaker();
  } else {
    return promiseMaker().catch(reason => {
      console.log("Retrying ", description, " failure: ", reason);
      return tryNTimes(promiseMaker, description, nTimes - 1);
    });
  }
}
