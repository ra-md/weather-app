import { createWrapper } from '../createWrapper';
import { locationData } from '../fakeData';
import SearchResult from '@/components/SearchResult.vue';

const mockLocalStorage = {};

jest.mock('@/utils/storage.service', () => {
  return {
    get() {
      return [];
    },
    set(name, value) {
      mockLocalStorage[name] = value;
    },
  };
});

jest.mock('vue-router', () => {
  return {
    useRouter() {
      return {
        push: jest.fn()
      };
    },
  };
});

describe(('SearchResult.vue'), () => {
  it('can render error message', () => {
    const errorMessage = 'error message';

    const wrapper = createWrapper(SearchResult, {
      props: {
        locationData: {
          error: true,
          message: errorMessage,
        },
      }
    });

    expect(wrapper.html()).toContain(errorMessage);
  });

  it('can render slot correctly', () => {
    const fakeSlot = 'slot';

    const wrapper = createWrapper(SearchResult, {
      props: {
        locationData,
      },
      slots: {
        default: fakeSlot,
      },
      global: {
        stubs: ['LocationList'],
      },
    })

    expect(wrapper.html()).toContain(fakeSlot);
  });

  it('can render temperature correctly', () => {
    const wrapper = createWrapper(SearchResult);

     expect(wrapper.html()).toContain(locationData.main.temp);
  });

  it('can save a location to the locationList', () => {
    const wrapper = createWrapper(SearchResult);

    wrapper.get('[data-test="select-location"]').trigger('click');
    expect(mockLocalStorage.locationList.length).toBe(1);
  });

  it('can\'t save the same location', () => {
    const wrapper = createWrapper(SearchResult);

    wrapper.get('[data-test="select-location"]').trigger('click');
    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockLocalStorage.locationList.length).toBe(1);
  });
});
