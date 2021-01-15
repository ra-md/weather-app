import { mount } from '@vue/test-utils';
import { fakeCurrentWeatherData, iconWithUrl } from '../helpers/fakeData'
import CurrentWeather from '@/components/CurrentWeather.vue';

const { current } = fakeCurrentWeatherData;

describe('CurrentWeather.vue', () => {
  it('should render all current weather information correctly', () => {
    const wrapper = mount(CurrentWeather, {
      props: {
        weatherData: fakeCurrentWeatherData,
      },
    });

    expect(wrapper.text()).toContain(current.temp);
    expect(wrapper.text()).toContain(current.weather[0].main);
    expect(wrapper.text()).toContain(current.pressure);
    expect(wrapper.text()).toContain(current.feels_like);
    expect(wrapper.get('[data-test="icon"]').attributes('src')).toBe(iconWithUrl);
  });
});
