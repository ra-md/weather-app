<template>
  <ul>
    <LocationItem v-for="(item, index) in locationListData" :key="index" :locationData="item" @deleteLocation="deleteLocation" />
  </ul>
</template>

<script>
import LocationItem from './LocationItem.vue';

export default {
  name: 'LocationList',
  components: {
    LocationItem,
  },
  props: {
    locationListData: {
      type: Array,
      required: true,
    },
  },
  setup(_, { emit }) {
    function deleteLocation(updatedLocations) {
      emit('deleteLocation', updatedLocations);
    }

    return {
      deleteLocation,
    };
  },
};
</script>
