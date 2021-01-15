import { mount } from '@vue/test-utils';
import { locationData, locationList } from '../helpers/fakeData';
import { mockLocalStorage, mockLocalStorageMethods } from '../helpers/mockStorage';
import SearchHistory from '@/components/SearchHistory.vue';

jest.mock('@/utils/storage.service', () => mockLocalStorageMethods());

jest.mock('vue-router');

const searchHistoryWrapper = () => mount(SearchHistory);

const btnRemove = '[data-test="btn-remove"]';

describe('SearchHistory.vue', () => {
  beforeEach(() => {
    mockLocalStorage.locationList = [{ name: locationData.name }];
  });

  it('don\'t display location list', () => {
    mockLocalStorage.locationList = null;

    const wrapper = searchHistoryWrapper();

    expect(wrapper.text()).not.toContain(btnRemove);
  });

  it('renders remove button', () => {
    const wrapper = searchHistoryWrapper();

    expect(wrapper.get(btnRemove).exists()).toBe(true);
  });

  it('can remove search history', async () => {
    const wrapper = searchHistoryWrapper();

    expect(mockLocalStorage.locationList.length).toBe(1);

    await wrapper.get(btnRemove).trigger('click');

    expect(wrapper.find(btnRemove).exists()).toBe(false);
    expect(mockLocalStorage.locationList.length).toBe(0);
  });
});
