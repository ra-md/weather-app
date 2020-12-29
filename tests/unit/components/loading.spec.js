import { mount } from '@vue/test-utils';
import Loading from '@/components/Loading.vue';

describe('Loading.vue', () => {
  it('disable vertical centering if centerY is false', () => {
    const wrapper = mount(Loading);

    expect(wrapper.get('[data-test="loading"]').attributes('class')).not.toContain('centerY');
  });

  it('enable vertical centering if centerY is true', () => {
    const wrapper = mount(Loading, {
      props: {
        centerY: true
      },
    });

    expect(wrapper.get('[data-test="loading"]').attributes('class')).toContain('centerY');
  });
});
