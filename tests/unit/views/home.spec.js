import { mockPush, mockRouter } from '../helpers/mockRouter';
import Home from '@/views/Home.vue';
import { mount } from '@vue/test-utils';
import { fakeCurrentWeatherData, fakeWeatherData } from '../helpers/fakeData'
import api from '@/api';
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

jest.mock('@/api');

describe('Home.vue', () => {

  beforeEach(() => {
    api.dailyForecast = () => {
      return {
        current: fakeCurrentWeatherData,
        weatherData: fakeWeatherData,
      };
    };
  });

  it('should render loading', () => {
    const wrapper = createWrapper();

    expect(wrapper.getComponent({ name: 'Loading' }).exists()).toBeTruthy();
  });

  it('should display error message', async () => {
    const errorMessage = 'error message';

    api.dailyForecast = () => {
      return new Promise((_, reject) => {
        reject({
          message: errorMessage,
        });
      });
    };

    const wrapper = createWrapper();

    await flushPromises();

    expect(wrapper.text()).toContain(errorMessage);
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
    const mockStorage = jest.fn().mockResolvedValue({ lat: 1, lon: 1 });

    storage.get = mockStorage;

    createWrapper();

    expect(mockStorage).toHaveBeenCalled();
  });

  it('should get coordinates from geolocation', () => {
    storage.get = jest.fn().mockImplementationOnce(() => null);

    const mockGetCurrentPosition = jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 1,
        longtitude: 1,
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

});
