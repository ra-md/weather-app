<template>
  <ul>
    <LocationItem v-for="(item, index) in locationListData" :key="index" :locationItemData="item" />
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
      default: () => [],
    },
  },
};
</script>
