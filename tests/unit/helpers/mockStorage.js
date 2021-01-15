export const mockLocalStorage = {};

export function mockLocalStorageMethods() {
  return {
    get(name) {
      return mockLocalStorage[name];
    },
    set(name, value) {
      mockLocalStorage[name] = value;
    }
  }
}
