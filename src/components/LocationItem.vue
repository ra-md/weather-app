<template>
  <li @click="selectLocation">
    <p>{{ locationItemData.locationName }}</p>
    <div class="right">
      <p>{{ removeDecimal(locationItemData.temp) }}&deg;</p>
      <!-- <i class="fas fa-times remove"></i> -->
    </div>
  </li>
</template>

<script>
import { useRouter } from 'vue-router';
import storage from '../utils/storage.service';
import removeDecimal from '../utils/removeDecimal';

export default {
  name: 'LocationList',
  props: {
    locationItemData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();

    function selectLocation() {
      storage.set('currentLocation', props.locationItemData.coordinates);
      router.push('/');
    }

    return {
      selectLocation,
      removeDecimal,
    };
  },
};
</script>

<style lang="sass" scoped>
li
  display: flex
  justify-content: space-between
  margin-bottom: .75em

.right
  display: flex
  align-items: center

  .remove
    margin-left: .75em
</style>
