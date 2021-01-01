import { createWrapper } from '../createWrapper';
import { locationData } from '../fakeData';
import SearchHistory from '@/components/SearchHistory.vue';

const mockLocalStorage = {
  locationList: [{ name: locationData.name }],
};

jest.mock('@/utils/storage.service', () => {
  return {
    get(name) {
      if (name === 'locationList') {
        return mockLocalStorage.locationList;
      }
    },
    set(name, value) {
      mockLocalStorage[name] = value;
    }
  }
});

jest.mock('vue-router');

describe('SearchHistory.vue', () => {
  it('renders remove button', () => {
    const wrapper = createWrapper(SearchHistory);

    expect(wrapper.get('[data-test="btn-remove"]').exists()).toBe(true);
  });

  it('can remove search history', async () => {
    const wrapper = createWrapper(SearchHistory);

    expect(mockLocalStorage.locationList.length).toBe(1);

    await wrapper.get('[data-test="btn-remove"]').trigger('click');

    expect(wrapper.find('[data-test="btn-remove"]').exists()).toBe(false);
    expect(mockLocalStorage.locationList.length).toBe(0);
  });
});
