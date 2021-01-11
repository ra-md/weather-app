import { mockRouter } from '../helpers/mockRouter';
import { mockLocalStorageMethods } from '../helpers/mockStorage';
import Home from '@/views/Home.vue';
import { mount } from '@vue/test-utils';
import { fakeCurrentWeatherData, fakeWeatherData } from '../helpers/fakeData'
import { nextTick } from 'vue';
import api from '@/api';

function createWrapper() {
  return mount(Home, {
    global: {
      stubs: ['router-link', 'Loading', 'CurrentWeather', 'Forecast'],
    },
  });
}

jest.mock('vue-router', () => mockRouter());

jest.mock('@/utils/storage.service', () => mockLocalStorageMethods());

jest.mock('@/api');

describe('Home.vue', () => {

  beforeEach(() => {
    api.dailyForecast = () => {
      return {
        current: fakeCurrentWeatherData,
        weatherData: fakeWeatherData,
      };
    };  
  })

  it('should render loading', () => {
    const wrapper = createWrapper();

    expect(wrapper.getComponent({ name: 'Loading' }).exists()).toBeTruthy();
  });

  it('should display an error message', async () => {
    const errorMessage = 'error message';

    api.dailyForecast = () => {
      return new Promise((_, reject) => {
        reject({
          message: errorMessage,
        });
      });
    };

    const wrapper = await createWrapper();

    await nextTick();

    expect(wrapper.text()).toContain(errorMessage);
  });

  it('should render current weather', async () => {
    const wrapper = await createWrapper();

    await nextTick();

    expect(wrapper.getComponent({ name: 'currentWeather' }).exists()).toBeTruthy();
  });

  it('should render forecast if', async () => {
    const wrapper = await createWrapper();

    await nextTick();

    expect(wrapper.getComponent({ name: 'forecast' }).exists()).toBeTruthy();
  });
});
