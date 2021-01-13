import { mount } from '@vue/test-utils';
import { locationData } from '../helpers/fakeData';

export default function createWrapper(component) {
  return ({ data = locationData, options = {} } = {}) => {
    return mount(component, {
      props: { 
        locationData: data
      },
      ...options,
    });
  };
}
