<template>
  <li>
    <p @click="selectLocation" class="location-name">{{ locationData.name }}</p>
    <p v-if="locationData.hasOwnProperty('main')">
      {{ removeDecimal(locationData.main.temp) }}&deg;
    </p>
    <button v-else @click="removeLocation" class="btn-remove">
      <i class="fas fa-times remove"></i>
    </button>
  </li>
</template>

<script>
import { useRouter } from 'vue-router';
import storage from '../utils/storage.service';
import removeDecimal from '../utils/removeDecimal';
import formatDate from '../utils/formatDate';

export default {
  name: 'LocationList',
  props: {
    locationData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();

    let locationList = storage.get('locationList') || [];

    function selectLocation() {
      const findLocation = locationList.find((item) => item.name === props.locationData.name);

      if (findLocation == null) {
        locationList.push({
          name: props.locationData.name,
          coord: props.locationData.coord,
        });
      }

      storage.set('locationList', locationList);
      storage.set('currentLocation', props.locationData.coord);

      router.push('/');
    }

    function removeLocation() {
      locationList = locationList.filter((location) => location.name !== props.locationData.name);
      storage.set('locationList', locationList);
      emit('deleteLocation', locationList);
    }

    return {
      selectLocation,
      removeLocation,
      removeDecimal,
      formatDate,
    };
  },
};
</script>

<style lang="sass" scoped>
li
  display: flex
  justify-content: space-between
  margin-bottom: .75em
  cursor: pointer

.location-name
  width: 100%

  &:hover
    color: $dark-gray

.btn-remove
  cursor: pointer
  padding: 0 .75em
  color: red
</style>
