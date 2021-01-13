import { date } from '../helpers/fakeData';
import formatDate from '@/utils/formatDate';

describe('formatDate.js', () => {
  const timestamp = date.timestamp;

  it('formats the date using options', () => {
    expect(formatDate({ timestamp, options: { dateStyle: 'long', timeZone: 'UTC' } })).toBe(date.fullDate);
  });

  it('length 12', () => {
    expect(formatDate({ timestamp: 1610552159673 })).toBe('1/13/2021');
  });
});
