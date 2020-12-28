<template>
  <slot />
  <LocationList :locationListData="locations" @deleteLocation="deleteLocation"/>
</template>

<script>
import { ref } from 'vue';
import LocationList from './LocationList.vue';
import storage from '../utils/storage.service';

export default {
  name: 'RecentLocation',
  components: {
    LocationList,
  },
  setup() {
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
