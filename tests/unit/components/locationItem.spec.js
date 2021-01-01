import { mount } from '@vue/test-utils';
import LocationItem from '@/components/LocationItem.vue';
// import storage from '@/utils/storage.service';

const mockPush = jest.fn();
const mockStorage = {};

jest.mock('@/utils/storage.service', () => {
  return {
    get() {
      return [];
    },
    set(name, value) {
      mockStorage[name] = value;
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

const locationName = 'Singapore';
const locationTemperature = 17;

function wrapperFactory(temp) {
  return mount(LocationItem, {
    props: {
      locationData: {
        name: locationName,
        ...temp,
        coord: {
          lon: 1,
          lat: 1,
        },
      },
    },
  });
}

describe('LocationItem.vue', () => {

  // ✔ 1. bisa menampilkan location item dengan temperatur
  // ✔ 2. bisa menampilkan location item dengan tombol remove location history
  // ✔ 3. bisa menambahkan location ke localStorage - router.push - push location locationList - set currentLocation
  // ✔ 3 or 4. tidak bisa menambahkan location ke localStorage kalau location sudah ada
  // 5. bisa menghapus location history - bisa emit - location yg berada di localStorage dihapus

  it('renders location item with temperature', () => {
    const wrapper = wrapperFactory({ main: { temp: locationTemperature } });

    expect(wrapper.html()).toContain(locationName);
    expect(wrapper.html()).toContain(locationTemperature);
  });

  it('renders location item with remove button', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.get('[data-test="btn-remove"]').exists()).toBe(true);
  });

  it('can save a location to locationList', () => {
    const wrapper = wrapperFactory({ main: { temp: locationTemperature } });

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockStorage.locationList.length).toBe(1);
  });

  it('can\'t save same location', () => {
    const wrapper = wrapperFactory({ main: { temp: locationTemperature } });

    wrapper.get('[data-test="select-location"]').trigger('click');
    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockStorage.locationList.length).toBe(1);
  });

  it('can save the cooord to currentLocation', () => {
    const wrapper = wrapperFactory({ main: { temp: locationTemperature } });

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockStorage.currentLocation).toEqual({ lat:1, lon: 1 });
  });

  it('can redirect to the main page after user click the location', () => {
    const wrapper = wrapperFactory({ main: { temp: locationTemperature } });

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('can remove a location history', () => {});

});
