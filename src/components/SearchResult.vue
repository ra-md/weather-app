<template>
  <p class="search-error-message" v-if="data.error">{{ data.message }}</p>
  <div v-else>
    <p class="search-result">Search result</p>
    <LocationList @click="addNewLocation" :locationListData="[modifedLocation]" />
  </div>
</template>

<script>
import LocationList from './LocationList.vue';
import storage from '../utils/storage.service';

export default {
  name: 'SearchResult',
  components: {
    LocationList,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const locationList = storage.get('locationList') || [];
    let modifedLocation;

    if (!props.data.error) {
      modifedLocation = {
        locationName: props.data.name,
        temp: props.data.main.temp,
        coordinates: props.data.coord,
      };
    }

    function addNewLocation() {
      locationList.push(modifedLocation);

      storage.set('locationList', locationList);
      storage.set('currentLocation', props.data.coord);
    }

    return {
      addNewLocation,
      modifedLocation,
    };
  },
};
</script>

<style lang="sass" scoped>
.search-error-message
  text-align: center
  color: lightgray

.search-result
  margin-bottom: .75em
  color: lightgray
</style>
