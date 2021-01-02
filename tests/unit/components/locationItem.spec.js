import { createWrapper } from '../createWrapper';
import { locationData } from '../fakeData';
import LocationItem from '@/components/LocationItem.vue';

const mockPush = jest.fn();
const mockLocalStorage = {};

jest.mock('@/utils/storage.service', () => {
  return {
    get() {
      return [];
    },
    set(name, value) {
      mockLocalStorage[name] = value;
    }
  }
});

jest.mock('vue-router', () => {
  return {
    useRouter() {
      return {
        push: mockPush
      }
    }
  };
});

describe('LocationItem.vue', () => {
  it('can save coord to the localStorage currentLocation', () => {
    const wrapper = createWrapper(LocationItem);

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockLocalStorage.currentLocation).toEqual(locationData.coord);
  });

  it('can redirect to the main page after users click the LocationItem', () => {
    const wrapper = createWrapper(LocationItem);

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/');
  });

});
