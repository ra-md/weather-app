export const iconWithUrl = 'icon-url';

const coord = { lat: 1, lon: 1 };

export const locationData = {
  name: 'location name',
  main: { temp: 10 },
  coord,
};

export const locationList = [
  {
    name: 'location 1',
    coord,
  },
  {
    name: 'location 2',
    coord,
  },
  {
    name: 'location 3',
    coord,
  }
];

export const date = {
  timestamp: 1317747600000,
  fullDate: 'October 4, 2011',
  hours_minutes: '5:00 PM',
  day_weekday_month: 'Tuesday, Oct 4'
}; 

export const fakeCurrentWeatherData = {
  temp: 18,
  weather: [{ main: 'Clear' }],
  feels_like: 17,
  pressure: 1008,
  iconWithUrl,
};

export const fakeWeatherData = {
  hourly: [{
    dt: date.timestamp,
    temp: 20,
    iconWithUrl,
  }],
  daily: [{
    dt: date.timestamp,
    temp: {
      min: 17,
      max: 20,
    },
  }],
};