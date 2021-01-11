import { date } from '../helpers/fakeData';
import formatDate from '@/utils/formatDate';

describe('formatDate.js', () => {
  const timestamp = date.timestamp;

  it('formats the date using options', () => {
    expect(formatDate({ timestamp, options: { dateStyle: 'long', timeZone: 'UTC' } })).toEqual(date.fullDate);
  });
});
