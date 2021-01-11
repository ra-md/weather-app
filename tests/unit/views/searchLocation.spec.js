import { mockLocalStorage, mockLocalStorageMethods } from '../helpers/mockStorage';
import { locationList, locationData } from '../helpers/fakeData';
import api from '@/api';
import SearchLocation from '@/views/SearchLocation.vue';
import { mount } from '@vue/test-utils';

jest.mock('@/api');

function createWrapper() {
  return mount(SearchLocation, {
    global: {
      stubs: ['router-link', 'Loading', 'SearchResult', 'SearchHistory'],
    },
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
    const mock = jest.fn();
    api.searchLocationByName = mock;

    const wrapper = createWrapper();

    await setValueAndTrigger(wrapper);

    expect(mock).toHaveBeenCalledWith(locationData.name);
  });

});
