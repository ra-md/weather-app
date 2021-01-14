import axios from 'axios';
import fakeWeather from '../tests/e2e/fixtures/singaporeCurrentWeather.json';
import fakeForeacast from '../tests/e2e/fixtures/singaporeOnecall.json';

axios.create = () => ({
  get(path, { params }) {

    if(params === 'invalid' || JSON.stringify(params) === JSON.stringify({q: 'invalid'})) {
      return Promise.reject(Error('Error'));
    } else if (path === 'weather') {
      return Promise.resolve({
        data: fakeWeather,
      });
    } else if (path === 'onecall') {
      return Promise.resolve({
        data: fakeForeacast,
      });
    }
  }
});

export default axios;
