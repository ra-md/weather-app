import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  params: {
    appid: process.env.VUE_APP_API_KEY,
    units: 'metric',
  },
});

const api = {
  async dailyForecast(coordinates) {
    const { data } = await axiosInstance.get('onecall', { params: coordinates });
    const details = await axiosInstance.get('weather', { params: coordinates });

    data.hourly = data.hourly.map((item) => ({ ...item, iconWithUrl: `${process.env.VUE_APP_ICON_URL}/${item.weather[0].icon}@2x.png` }));
    data.current.iconWithUrl = `${process.env.VUE_APP_ICON_URL}/${data.current.weather[0].icon}@2x.png`;

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
