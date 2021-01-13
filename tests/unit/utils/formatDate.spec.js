import { date } from '../helpers/fakeData';
import formatDate from '@/utils/formatDate';

describe('formatDate.js', () => {
  const timestamp = date.timestamp;

  it('should format the date using options', () => {
    expect(formatDate({ timestamp, options: { dateStyle: 'long', timeZone: 'UTC' } })).toBe(date.fullDate);
  });

  it('should format 10 digits timestamp', () => {
    expect(formatDate({ timestamp: 1315119600 })).toBe('9/4/2011');
  });
});
