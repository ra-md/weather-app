import { locationData } from '../helpers/fakeData';
import api from '@/api';
import SearchLocation from '@/views/SearchLocation.vue';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

jest.mock('@/api');

jest.mock('vue-router');

function createWrapper(options) {
  return mount(SearchLocation, {
    global: {
      stubs: ['router-link', 'Loading', 'SearchHistory'],
    },
    ...options,
  });
}

function setValueAndTrigger(wrapper) {  
  wrapper.get('[data-test="search-input"]').setValue(locationData.name);
  wrapper.get('[data-test="search-input"]').trigger('keyup', { key: 'enter' });
}

describe('SearchLocation.vue', () => {
  it('should render Loading', async () => {
    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper);

    expect(wrapper.getComponent({ name: 'Loading' }).exists()).toBeTruthy();
  });

  it('search a location by location\'s name', async () => {
    const mock = jest.fn().mockResolvedValue(locationData);
    api.searchLocationByName = mock;

    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper);

    await flushPromises();

    expect(mock).toHaveBeenCalledWith(locationData.name);
    expect(wrapper.getComponent({ name: 'SearchResult' }).exists()).toBeTruthy()
  });

  it('should display location not found', async () => {
    api.searchLocationByName = jest.fn().mockRejectedValue();

    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper);

    await flushPromises();

    expect(wrapper.text()).toContain('Location not found!');
  });

});
