<template>
  <p style="color: #9CA3AF; margin-bottom: .75em">Recent locations</p>
  <LocationList :locationListData="locations"/>
</template>

<script>
import LocationList from './LocationList.vue';
import storage from '../utils/storage.service';

export default {
  name: 'RecentLocation',
  components: {
    LocationList,
  },
  setup() {
    const locations = storage.get('locationList') || [];
    return {
      locations,
    };
  },
};
</script>
