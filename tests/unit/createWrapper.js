import { mount } from '@vue/test-utils';
import { locationData } from './fakeData';

export function createWrapper(component, options) {
  return mount(component, options || {
    props: {
      locationData,
    },
  });
}
