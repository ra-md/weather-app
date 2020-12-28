<template>
  <div class="current-weather">
    <div class="container">
      <div class="current-weather-data">
        <span class="current-weather-value">{{ removeDecimal(currentWeather.temp) }}</span>
        <span class="current-weather-deg">&deg;c</span>
      </div>
      <p class="current-weather-description">{{ currentWeather.weather[0].main }}</p>
      <div class="current-weather-details">
        <div class="pressure">
          <p class="value">{{ currentWeather.pressure }} mb</p>
          <p class="name">Pressure</p>
        </div>
        <img :src="`${iconUrl}${currentWeather.weather[0].icon}@2x.png`">
        <div class="feels-like">
          <p class="value">{{ currentWeather.feels_like }}&deg;</p>
          <p class="name">Feels like</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import removeDecimal from '../utils/removeDecimal';
import { iconUrl } from '../utils/config';

export default {
  name: 'CurrentWeather',
  props: {
    currentWeather: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      removeDecimal,
      iconUrl,
    };
  },
};
</script>

<style lang="sass" scoped>
.current-weather
  position: fixed
  left: 0
  right: 0
  top: 0

.current-weather-data
  display: flex
  justify-content: center
  align-items: flex-start
  margin-top: 3em
  margin-bottom: 1.5em

.current-weather-value
  font-size: 9rem

.current-weather-deg
  font-size: 3.5rem

.current-weather-description
  font-size: 1.5rem
  text-align: center
  margin-bottom: 3em

.current-weather-details
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  align-items: center
  text-align: center

  .pressure
    text-align: left

  .feels-like
    text-align: right

  .pressure, .feels-like
    font-size: .75rem

    .value
      font-weight: bold

  img
    width: 50px
    justify-self: center
</style>
