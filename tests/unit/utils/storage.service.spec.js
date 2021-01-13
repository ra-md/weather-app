import storage from '@/utils/storage.service';

const localStorageValue = { test: 123 };

describe('storage', () => {
  it('can set items to localStorage', () => {
    const mockSetItem = jest.fn();
    const setItemKey = 'setItemKey'

    Storage.prototype.setItem = mockSetItem;

    storage.set(setItemKey, localStorageValue);

    expect(mockSetItem).toHaveBeenCalledWith(setItemKey, JSON.stringify(localStorageValue));
  });

  it('can get item from localStorage', () => {
    const mockGetItem = jest.fn().mockImplementation(() => JSON.stringify(localStorageValue) );
    const getItemKey = 'getItemKey';

    Storage.prototype.getItem = mockGetItem;

    storage.get(getItemKey);

    expect(mockGetItem).toHaveBeenCalledWith(getItemKey);
  });

});
