<template>
  <p class="search-error-message" v-if="locationData.error">{{ locationData.message }}</p>
  <div v-else>
    <slot />
    <LocationList :locationListData="[locationData]" />
  </div>
</template>

<script>
import LocationList from './LocationList.vue';

export default {
  name: 'SearchResult',
  components: {
    LocationList,
  },
  props: {
    locationData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="sass" scoped>
.search-error-message
  text-align: center
  color: $dark-gray
</style>
