import { mount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';

describe('AppHeader.vue', () => {
  it('renders nav when toggle nav clicked', async () => {
    const wrapper = mount(AppHeader);

    await wrapper.get('[data-test="toggle-nav"]').trigger('click');

    expect(wrapper.find('[data-test="nav"]').isVisible()).toBe(true);
  });
});
