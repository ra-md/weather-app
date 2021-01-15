import { locationData } from '../helpers/fakeData';
import SearchLocation from '@/views/SearchLocation.vue';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

jest.mock('vue-router');

function createWrapper(options) {
  return mount(SearchLocation, {
    global: {
      stubs: ['router-link', 'Loading', 'SearchHistory'],
    },
    ...options,
  });
}

function setValueAndTrigger(wrapper, value = locationData.name) {  
  wrapper.get('[data-test="search-input"]').setValue(value);
  wrapper.get('[data-test="search-input"]').trigger('keyup', { key: 'enter' });
}

describe('SearchLocation.vue', () => {
  it('should render Loading', async () => {
    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper);

    expect(wrapper.getComponent({ name: 'Loading' }).exists()).toBeTruthy();
  });

  it('search a location by location\'s name', async () => {

    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper);

    await flushPromises();

    expect(wrapper.getComponent({ name: 'SearchResult' }).exists()).toBeTruthy()
  });

  it('should display location not found', async () => {
    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper, 'invalid');

    await flushPromises();

    expect(wrapper.text()).toContain('Location not found!');
  });

  it('should hide SearchResult when search value is empty', async () => {
    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper);

    await setValueAndTrigger(wrapper, '');

    expect(wrapper.find('[data-test="SearchResult"').exists()).toBeFalsy();
  });

});
