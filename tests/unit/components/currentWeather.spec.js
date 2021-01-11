import { mount } from '@vue/test-utils';
import { fakeCurrentWeatherData, iconWithUrl } from '../helpers/fakeData'
import CurrentWeather from '@/components/CurrentWeather.vue';

describe('CurrentWeather.vue', () => {
  it('should render all current weather information correctly', () => {
    const wrapper = mount(CurrentWeather, {
      props: {
        currentWeather: fakeCurrentWeatherData,
      },
    });

    expect(wrapper.text()).toContain(fakeCurrentWeatherData.temp);
    expect(wrapper.text()).toContain(fakeCurrentWeatherData.weather[0].main);
    expect(wrapper.text()).toContain(fakeCurrentWeatherData.pressure);
    expect(wrapper.text()).toContain(fakeCurrentWeatherData.feels_like);
    expect(wrapper.get('[data-test="icon"]').attributes('src')).toBe(iconWithUrl);
  });
});
