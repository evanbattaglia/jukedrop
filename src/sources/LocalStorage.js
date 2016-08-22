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
  // Don't write the string "undefined" -- not JSON parseable
  if (typeof val === 'undefined') val = null;

  localStorage.setItem(key, JSON.stringify(val));
}

function remove(key) {
  localStorage.removeItem(key);
}

export default { get, set, remove };
