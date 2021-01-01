import { mount } from '@vue/test-utils';

export function createWrapper(component, options) {
  return mount(component, options);
}
