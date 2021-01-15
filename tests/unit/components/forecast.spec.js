import { date, fakeWeatherData, iconWithUrl } from '../helpers/fakeData';
import { mount } from '@vue/test-utils';
import Forecast from '@/components/Forecast.vue';

describe('Forecast.vue', () => {
  it('should render forecast correctly', () => {
    const wrapper = mount(Forecast, {
      props: {
        weatherData: fakeWeatherData,
      },
      data: () => ({ timeZone: 'UTC' })
    });

    expect(wrapper.text()).toContain(date.hours_minutes);
    expect(wrapper.text()).toContain(fakeWeatherData.hourly[0].temp);
    expect(wrapper.text()).toContain(date.day_weekday_month);
    expect(wrapper.text()).toContain(fakeWeatherData.daily[0].temp.min);
    expect(wrapper.text()).toContain(fakeWeatherData.daily[0].temp.max);
    expect(wrapper.get('[test-data="hourly-icon"]').attributes('src')).toBe(iconWithUrl);

  });
});
