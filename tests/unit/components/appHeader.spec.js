import { mount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';

describe('AppHeader.vue', () => {
  it('renders nothing if there is no slot', () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.get('[data-test="container"]').text()).toBe('');
  });

  it('renders slots correctly', () => {
    const defaultSlots = '<h1>App Header</h1>';

    const wrapper = mount(AppHeader, {
      slots: {
        default: defaultSlots,
      },
    });

    expect(wrapper.html()).toContain(defaultSlots);
  });
});
