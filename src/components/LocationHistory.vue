<template>
  <slot />
  <LocationList :locationListData="locations" @deleteLocation="deleteLocation"/>
</template>

<script>
import { ref } from 'vue';
import LocationList from './LocationList.vue';
// import storageService from '../utils/storage.service';
import storage from '../utils/storage.service';

export default {
  name: 'LocationHistory',
  components: {
    LocationList,
  },
  setup() {
    // const storage = storageService(window.localStorage);
    const locations = ref(storage.get('locationList') || []);

    function deleteLocation(updatedLocations) {
      locations.value = updatedLocations;
    }

    return {
      locations,
      deleteLocation,
    };
  },
};
</script>
