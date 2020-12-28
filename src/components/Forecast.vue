<template>
  <div class="container">
    <div class="forecast">
      <ul class="hourly-weather">
        <li class="hourly-weather-item" v-for="(item, index) in weatherData.hourly" :key="index">
          <p>{{ formatDate({ timestamp: item.dt }) }}</p>
          <img :src="`${iconUrl}${item.weather[0].icon}@2x.png`">
          <p>{{ removeDecimal(item.temp) }}&deg;</p>
        </li>
      </ul>
      <ul class="daily-weather">
        <li
          class="daily-weather-item"
          v-for="(dailyWeather, index) in weatherData.daily"
          :key="index">
          <p>
            {{ formatDate({
                timestamp: dailyWeather.dt,
                options: { day: 'numeric', weekday: 'long' },
              })
            }}
          </p>
          <img :src="`${iconUrl}${dailyWeather.weather[0].icon}@2x.png`">
          <p>
            {{ removeDecimal(dailyWeather.temp.min) }}&deg;
            -
            {{ removeDecimal(dailyWeather.temp.max) }}&deg;
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import formatDate from '../utils/formatDate';
import removeDecimal from '../utils/removeDecimal';
import { iconUrl } from '../utils/config';

export default {
  name: 'Forecast',
  props: {
    weatherData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      removeDecimal,
      formatDate,
      iconUrl,
    };
  },
};
</script>

<style lang="sass" scoped>
.forecast
  background-color: $secondary
  color: white
  position: relative
  margin-top: 24em
  padding: .75em
  border-radius: 10px 10px 0 0
  z-index: 10
  box-shadow: 0 0 10px rgba(0,0,0,0.5)

ul
  list-style: none

img
  width: 50px

.hourly-weather
  display: flex
  overflow: auto

  p
    padding: .5em 0

  &-item
    text-align: center

  p:first-child
    width: 5em

.daily-weather
  margin: 1.5em 0

  &-item
    display: grid
    grid-template-columns: 2fr 1fr 1fr
    align-items: center

    p:last-child
      text-align: right

</style>
