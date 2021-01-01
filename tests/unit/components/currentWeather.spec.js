import { mount } from '@vue/test-utils';
import CurrentWeather from '@/components/CurrentWeather.vue';

describe('CurrentWeather.vue', () => {
  it('renders all current weather information correctly', () => {
    const iconWithUrl = 'icon-url';

    const currentWeather = {
      temp: 18,
      weather: [{ main: 'Clear' }],
      feels_like: 17,
      pressure: 1008,
      iconWithUrl,
    };

    const wrapper = mount(CurrentWeather, {
      props: {
        currentWeather,
      },
    });

    expect(wrapper.html()).toContain(currentWeather.temp);
    expect(wrapper.html()).toContain(currentWeather.weather[0].main);
    expect(wrapper.html()).toContain(currentWeather.pressure);
    expect(wrapper.html()).toContain(currentWeather.feels_like);
    expect(wrapper.get('[data-test="icon"]').attributes('src')).toBe(iconWithUrl);
  });
});
