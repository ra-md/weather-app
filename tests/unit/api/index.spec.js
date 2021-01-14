import api from '@/api';

describe('api', () => {
  it('mock get from axios instance', async () => {
    await api.searchLocationByName({lat: 1, lon: 1});
  });
});