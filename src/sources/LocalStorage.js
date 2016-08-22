function get(key, defaultVal) {
  const loadedJson = localStorage.getItem(key);
  if (loadedJson) {
    return JSON.parse(loadedJson);
  } else {
    set(key, defaultVal);
    return defaultVal;
  }
}

function set(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function remove(key) {
  localStorage.removeItem(key);
}

export default { get, set, remove };
