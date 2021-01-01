import { mount } from '@vue/test-utils';
import LocationItem from '@/components/LocationItem.vue';

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
const coord = { lon: 1, lat: 1 };

function wrapperFactory(temp) {
  return mount(LocationItem, {
    props: {
      locationData: {
        name: locationName,
        ...temp,
        coord,
      },
    },
  });
}

describe('LocationItem.vue', () => {
  it('renders location with temperature', () => {
    const wrapper = wrapperFactory({ main: { temp: locationTemperature } });

    expect(wrapper.html()).toContain(locationName);
    expect(wrapper.html()).toContain(locationTemperature);
  });

  it('renders location with a remove button', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.get('[data-test="btn-remove"]').exists()).toBe(true);
  });

  it('can save a location to the localStorage locationList', () => {
    const wrapper = wrapperFactory();

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockStorage.locationList.length).toBe(1);
  });

  it('can\'t save the same location', () => {
    const wrapper = wrapperFactory();

    wrapper.get('[data-test="select-location"]').trigger('click');
    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockStorage.locationList.length).toBe(1);
  });

  it('can save coord to the localStorage currentLocation', () => {
    const wrapper = wrapperFactory();

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockStorage.currentLocation).toEqual(coord);
  });

  it('can redirect to the main page after users click the LocationItem', () => {
    const wrapper = wrapperFactory();

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('can remove a location from the locationList', () => {
    const wrapper = wrapperFactory();

    wrapper.get('[data-test="select-location"]').trigger('click');

    wrapper.get('[data-test="btn-remove"]').trigger('click');

    expect(wrapper.emitted().deleteLocation[0][0].length).toBe(0);
    expect(mockStorage.locationList.length).toBe(0);
  });

});
