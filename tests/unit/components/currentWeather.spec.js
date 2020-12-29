import { mount } from '@vue/test-utils';
import CurrentWeather from '@/components/CurrentWeather.vue';

describe('CurrentWeather.vue', () => {
  it('renders all current weather information correctly', () => {
    const currentWeather = {
      temp: 18,
      weather: [
        {
          main: 'Clear',
          icon: '10d',
        }
      ],
      feels_like: 17,
      pressure: 1008,
    };

    const wrapper = mount(CurrentWeather, {
      props: {
        currentWeather,
      },
    });

    expect(wrapper.get('[data-test="temp"]').text()).toContain(currentWeather.temp);
    expect(wrapper.get('[data-test="main"]').text()).toContain(currentWeather.weather[0].main);
    expect(wrapper.get('[data-test="icon"]').attributes('src')).toContain(currentWeather.weather[0].icon);
    expect(wrapper.get('[data-test="pressure"]').text()).toContain(currentWeather.pressure);
    expect(wrapper.get('[data-test="feels-like"]').text()).toContain(currentWeather.feels_like);
  });
});
