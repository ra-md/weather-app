import AppHeader from '@/components/AppHeader.vue';
import { mount } from '@vue/test-utils';

describe('AppHeader.vue', () => {
  it('should render slots', () => {
    const defaultSlots = 'App Header';

    const wrapper = mount(AppHeader, {
      slots: {
        default: defaultSlots,
      },
    });

    expect(wrapper.text()).toContain(defaultSlots);
  });
});
