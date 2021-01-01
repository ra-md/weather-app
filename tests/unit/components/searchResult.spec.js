import { mount } from '@vue/test-utils';
import SearchResult from '@/components/SearchResult.vue';

describe(('SearchResult.vue'), () => {
  it('can render error message', () => {
    const errorMessage = 'error message';

    const wrapper = mount(SearchResult, {
      props: {
        locationData: {
          error: true,
          message: errorMessage,
        }
      },
      global: {
        stubs: ['LocationList'],
      },
    });

    expect(wrapper.html()).toContain(errorMessage);
  });

  it('can render slot correctly', () => {
    const fakeSlot = 'slot';

    const wrapper = mount(SearchResult, {
      props: {
        locationData: {},
      },
      slots: {
        default: fakeSlot,
      },
      global: {
        stubs: ['LocationList'],
      },
    });

    expect(wrapper.html()).toContain(fakeSlot);
  });
});
