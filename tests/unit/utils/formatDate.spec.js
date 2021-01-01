import formatDate from '@/utils/formatDate';

describe('formatDate.js', () => {
  const timestamp = 1267610316543;

  it('formats the date to 12-hours', () => {
    expect(formatDate({ timestamp })).toEqual('4:58 PM');
  });

  it('formats the date using options', () => {
    expect(formatDate({ timestamp, options: { dateStyle: 'long' } })).toEqual('March 3, 2010');
  });
});
