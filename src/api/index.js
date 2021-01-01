import axios from 'axios';

const ICON_URL = 'http://openweathermap.org/img/wn';
const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '2c3c9a5f59bde6b6cea8d12b34126f5b';

const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

const api = {
  async dailyForecast(coordinates) {
    const { data } = await axiosInstance.get('onecall', { params: coordinates });
    const details = await axiosInstance.get('weather', { params: coordinates });

    data.hourly = data.hourly.map((item) => ({ ...item, iconWithUrl: `${ICON_URL}/${item.weather[0].icon}@2x.png` }));
    data.current.iconWithUrl = `${ICON_URL}/${data.current.weather[0].icon}@2x.png`;

    return {
      ...data,
      locationName: details.data.name,
    };
  },
  async searchLocationByName(locationName) {
    const { data } = await axiosInstance.get('weather', { params: { q: locationName } });
    return data;
  },
};

export default api;
