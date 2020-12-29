<template>
  <div class="container">
    <div class="forecast">
      <ul class="hourly-weather">
        <li class="hourly-weather-item" v-for="(item, index) in weatherData.hourly" :key="index">
          <p test-data="hourly-date">{{ formatDate({ timestamp: item.dt }) }}</p>
          <img :src="`${iconUrl}${item.weather[0].icon}@2x.png`" test-data="hourly-icon">
          <p test-data="hourly-temp">{{ removeDecimal(item.temp) }}&deg;</p>
        </li>
      </ul>
      <ul class="daily-weather">
        <div class="desc">
          <span class="desc-min">Min</span>
          <span class="desc-max">Max</span>
        </div>
        <li
          class="daily-weather-item"
          v-for="(dailyWeather, index) in weatherData.daily"
          :key="index">
          <p test-data="daily-date">
            {{ formatDate({
                timestamp: dailyWeather.dt,
                options: { day: 'numeric', weekday: 'long', month: 'short' },
              })
            }}
          </p>
          <div class="temp">
            <span class="min" test-data="daily-temp-min">{{ removeDecimal(dailyWeather.temp.min) }}&deg;</span>
            <span class="max" test-data="daily-temp-max">{{ removeDecimal(dailyWeather.temp.max) }}&deg;</span>
          </div>
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
      required: true,
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

  .desc
    text-align: end

    &-min
      color: $dark-gray
      padding-right: 15px

    &-max
      font-weight: bold

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
