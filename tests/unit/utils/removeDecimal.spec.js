import removeDecimal from '@/utils/removeDecimal';

describe('removeDecimal.js', () => {
  it('can remove decimal', () => {
    expect(removeDecimal(7.7)).toBe(7);
    expect(removeDecimal(8)).toBe(8);
    expect(removeDecimal()).toBe('');
  });
});
