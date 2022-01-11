<template>
  <div class="container">
    <div class="forecast">
      <ul class="hourly-weather">
        <li class="hourly-weather-item" v-for="(item, index) in weatherData.hourly" :key="index">
          <p>{{ formatDate({ timestamp: item.dt, options: hourlyOptions }) }}</p>
          <img :src="item.iconWithUrl" test-data="hourly-icon">
          <p>{{ removeDecimal(item.temp) }}&deg;</p>
        </li>
      </ul>
      <ul class="daily-weather">
        <li
          class="daily-weather-item"
          v-for="(dailyWeather, index) in weatherData.daily"
          :key="index">
          <p>
            {{ formatDate({ timestamp: dailyWeather.dt, options: dailyOptions })}}
          </p>
          <div class="temp">
            <span class="min">{{ removeDecimal(dailyWeather.temp.min) }}&deg;</span>
            <span class="max">{{ removeDecimal(dailyWeather.temp.max) }}&deg;</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import formatDate from '../utils/formatDate';
import removeDecimal from '../utils/removeDecimal';

export default {
  name: 'Forecast',
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeZone: undefined,
    };
  },
  computed: {
    hourlyOptions() {
      return {
        timeStyle: 'short',
        hour12: true,
        timeZone: this.timeZone,
      };
    },
    dailyOptions() {
      return {
        day: 'numeric',
        weekday: 'long',
        month: 'short',
        timeZone: this.timeZone,
      };
    },
  },
  setup() {
    return {
      removeDecimal,
      formatDate,
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
    display: flex
    justify-content: space-between
    padding: .75em 0
    align-items: center

    .temp
      display: flex
      align-items: center
      justify-content: space-between
      width: 70px

    .min
      color: $dark-gray

    .max
      font-weight: bold
</style>
