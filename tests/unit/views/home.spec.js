import { mockPush, mockRouter } from '../helpers/mockRouter';
import Home from '@/views/Home.vue';
import { mount } from '@vue/test-utils';
import { fakeCurrentWeatherData, fakeWeatherData } from '../helpers/fakeData'
import storage from '@/utils/storage.service';
import flushPromises from 'flush-promises';

function createWrapper() {
  return mount(Home, {
    global: {
      stubs: ['router-link', 'Loading', 'CurrentWeather', 'Forecast'],
    },
  });
}

jest.mock('vue-router', () => mockRouter());

jest.mock('@/utils/storage.service');

describe('Home.vue', () => {

  it('should render loading', () => {
    const wrapper = createWrapper();

    expect(wrapper.getComponent({ name: 'Loading' }).exists()).toBeTruthy();
  });

  it('should render current weather', async () => {
    const wrapper = createWrapper();

    await flushPromises();

    expect(wrapper.getComponent({ name: 'currentWeather' }).exists()).toBeTruthy();
  });

  it('should render forecast', async () => {
    const wrapper = createWrapper();

    await flushPromises();

    expect(wrapper.getComponent({ name: 'forecast' }).exists()).toBeTruthy();
  });

  it('should get coordinates from localstorage', () => {
    const mockStorage = jest.fn().mockReturnValue({ lat: 1, lon: 1 });

    storage.get = mockStorage;

    createWrapper();

    expect(mockStorage).toHaveBeenCalled();
  });

  it('should get coordinates from geolocation', () => {
    storage.get = jest.fn().mockImplementationOnce(() => null);
    const mockGetCurrentPosition = jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 1,
        longitude: 1,
      }
    })));

    navigator.geolocation = {
      getCurrentPosition: mockGetCurrentPosition,
    };

    createWrapper();

    expect(mockGetCurrentPosition).toHaveBeenCalled();
  });

  it('should change the URL when coordinates are not available in geolocation and storage', () => {
    navigator.geolocation = {
      getCurrentPosition: jest.fn(),
    };

    createWrapper();

    expect(mockPush).toHaveBeenCalled();
  });

  it('should display error message', async () => {
    const mockStorage = jest.fn().mockReturnValue('invalid');

    storage.get = mockStorage;

    const wrapper = createWrapper();

    await flushPromises();

    console.log(wrapper.html());

    expect(wrapper.get('[data-test="error"]').exists()).toBeTruthy();
  });

});
