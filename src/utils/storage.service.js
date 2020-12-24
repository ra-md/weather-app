const storage = {
  remove(name) {
    window.localStorage.removeItem(name);
  },
  get(name) {
    const item = window.localStorage.getItem(name);
    return JSON.parse(item);
  },
  set(name, value) {
    const str = JSON.stringify(value);
    window.localStorage.setItem(name, str);
  },
};

export default storage;
