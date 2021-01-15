import createWrapper from '../helpers/createWrapper';
import { locationData } from '../helpers/fakeData';
import { mockLocalStorage, mockLocalStorageMethods } from '../helpers/mockStorage';
import { mockPush, mockRouter } from '../helpers/mockRouter';
import LocationItem from '@/components/LocationItem.vue';

jest.mock('@/utils/storage.service', () => mockLocalStorageMethods());

jest.mock('vue-router', () => mockRouter());

const locationItemWrapper = createWrapper(LocationItem);

describe('LocationItem.vue', () => {
  it('should display loation name', () => {
    const wrapper = locationItemWrapper();

    expect(wrapper.text()).toContain(locationData.name);
  })

  it('can save coord to the localStorage currentLocation', () => {
    const wrapper = locationItemWrapper();

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockLocalStorage.currentLocation).toEqual(locationData.coord);
  });

  it('can redirect to the main page after users click the LocationItem', () => {
    const wrapper = locationItemWrapper();

    wrapper.get('[data-test="select-location"]').trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/');
  });

});