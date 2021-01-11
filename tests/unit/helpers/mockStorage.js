export const mockLocalStorage = {
  currentLocation: { lat: 1, lon: 1 },
};

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
