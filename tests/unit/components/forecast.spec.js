import { mount } from '@vue/test-utils';
import faker from 'faker';
import Forecast from '@/components/Forecast.vue';

describe('Forecast.vue', () => {
  it('renders all forecast information correctly', () => {
    const fakeDate = 1267610316543;

    const weatherData = {
      hourly: [{
        dt: fakeDate,
        temp: 20,
        weather: [{ icon: '10d' }],
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

    expect(wrapper.get('[test-data="hourly-date"]').text()).toContain('4:58 PM');
    expect(wrapper.get('[test-data="hourly-temp"]').text()).toContain(weatherData.hourly[0].temp);
    expect(wrapper.get('[test-data="hourly-icon"]').attributes('src')).toContain(weatherData.hourly[0].weather[0].icon);
    expect(wrapper.get('[test-data="daily-date"]').text()).toContain('Wednesday, Mar 3');
    expect(wrapper.get('[test-data="daily-temp-min"]').text()).toContain(weatherData.daily[0].temp.min);
    expect(wrapper.get('[test-data="daily-temp-max"]').text()).toContain(weatherData.daily[0].temp.max);

  });
});
