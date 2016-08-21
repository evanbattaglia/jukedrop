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

export default { get, set };
