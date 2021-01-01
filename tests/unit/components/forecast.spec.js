import { mount } from '@vue/test-utils';
import faker from 'faker';
import Forecast from '@/components/Forecast.vue';

describe('Forecast.vue', () => {
  it('renders all forecast information correctly', () => {
    const fakeDate = 1267610316543;
    const iconWithUrl = 'icon-url';

    const weatherData = {
      hourly: [{
        dt: fakeDate,
        temp: 20,
        iconWithUrl,
      }],
      daily: [{
        dt: fakeDate,
        temp: {
          min: 17,
          max: 20,
        },
      }],
    };

    const wrapper = mount(Forecast, {
      props: {
        weatherData,
      },
    });

    expect(wrapper.html()).toContain('4:58 PM');
    expect(wrapper.html()).toContain(weatherData.hourly[0].temp);
    expect(wrapper.html()).toContain('Wednesday, Mar 3');
    expect(wrapper.html()).toContain(weatherData.daily[0].temp.min);
    expect(wrapper.html()).toContain(weatherData.daily[0].temp.max);
    expect(wrapper.get('[test-data="hourly-icon"]').attributes('src')).toBe(iconWithUrl);

  });
});
