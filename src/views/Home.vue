<template>
  <div>
    <div v-if="loading">
      <Loading :centerY="true" />
    </div>
    <p class="error" v-else-if="error">{{ error }}</p>
    <div v-else>
      <AppHeader>
        <p class="location-name">{{ weather.locationName }}</p>
        <router-link to="/search" aria-label="search location">
          <i class="fas fa-plus add-location"></i>
        </router-link>
      </AppHeader>
      <CurrentWeather :current-weather="weather.current" />
      <Forecast :weather-data="weather" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import storage from '../utils/storage.service';
import api from '../api';
import AppHeader from '../components/AppHeader.vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import Forecast from '../components/Forecast.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
    CurrentWeather,
    Forecast,
    Loading,
  },
  setup() {
    const router = useRouter();
    const weather = ref({});
    const loading = ref(true);
    const error = ref('');

    function getCurrentLocation() {
      return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
    }

    onMounted(async () => {
      let coordinates = storage.get('currentLocation');

      if (coordinates == null) {
        try {
          const { coords } = await getCurrentLocation();
          coordinates = {
            lat: coords.latitude,
            lon: coords.longitude,
          };
        } catch (_) {
          router.push('/search-location');
        }
      }

      try {
        weather.value = await api.dailyForecast(coordinates);
      } catch (err) {
        error.value = err.message;
      }

      loading.value = false;
    });

    return {
      loading,
      weather,
      error,
    };
  },
};
</script>

<style lang="sass" scoped>
.location-name
  font-size: 1.5rem

.add-location
  color: $blue

.error
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>
