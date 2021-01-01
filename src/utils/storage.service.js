export function sr(storage) {
  return {
    get(name) {
      const item = storage.getItem(name);
      return JSON.parse(item);
    },
    set(name, value) {
      const str = JSON.stringify(value);
      storage.setItem(name, str);
    },
  };
}

const storageService = {
  get(name) {
    const item = storage.getItem(name);
    return JSON.parse(item);
  },
  set(name, value) {
    const str = JSON.stringify(value);
    storage.setItem(name, str);
  },
};

export default storageService;
