import createWrapper from '../helpers/createWrapper';
import { locationData } from '../helpers/fakeData';
import { mockLocalStorage, mockLocalStorageMethods } from '../helpers/mockStorage';
import { mockRouter } from '../helpers/mockRouter';
import SearchResult from '@/components/SearchResult.vue';

jest.mock('@/utils/storage.service', () => mockLocalStorageMethods());

jest.mock('vue-router', () => mockRouter());

const searchResultWrapper = createWrapper(SearchResult);

describe(('SearchResult.vue'), () => {
  it('should render error message', () => {
    const errorMessage = 'error message';

    const wrapper = searchResultWrapper({
      data: {
        error: true,
        message: errorMessage,
      }
    });

    expect(wrapper.text()).toContain(errorMessage);
  });

  it('should render slot correctly', () => {
    const fakeSlot = 'slot';

    const wrapper = searchResultWrapper({
      options: {
        slots: {
          default: fakeSlot,
        },
        global: {
          stubs: ['LocationList'],
        },
      },
    });

    expect(wrapper.text()).toContain(fakeSlot);
  });

  it('should render temperature', () => {
    const wrapper = searchResultWrapper();

     expect(wrapper.text()).toContain(locationData.main.temp);
  });

  it('can save a location to the locationList', () => {
    const wrapper = searchResultWrapper();

    wrapper.get('[data-test="select-location"]').trigger('click');
    expect(mockLocalStorage.locationList.length).toBe(1);
  });

  it('can\'t save the same location', () => {
    const wrapper = searchResultWrapper();

    wrapper.get('[data-test="select-location"]').trigger('click');
    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockLocalStorage.locationList.length).toBe(1);
  });
});
