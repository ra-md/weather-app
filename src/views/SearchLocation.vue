<template>
  <div>
    <AppHeader>
      <div class="search">
        <i class="fas fa-search center-y"></i>
        <input id="search-input" required="true" v-model="searchValue">
        <label class="center-y" for="search-input">Type something here...</label>
      </div>
      <button>
        <router-link to="/">Cancel</router-link>
      </button>
    </AppHeader>
    <div class="container">
      <div v-if="loading">
        <h1>Loading...</h1>
      </div>
      <div v-else>
        <SearchResult v-if="searchLocationResult" :data="searchLocationResult" />
        <RecentLocation v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { ref, watch } from 'vue';
import api from '../api';
import AppHeader from '../components/AppHeader.vue';
import SearchResult from '../components/SearchResult.vue';
import RecentLocation from '../components/RecentLocation.vue';

export default {
  name: 'SearchLocation',
  components: {
    AppHeader,
    SearchResult,
    RecentLocation,
  },
  setup() {
    const searchValue = ref('');
    const searchLocationResult = ref();
    const loading = ref(false);

    async function getLocation() {
      try {
        if (searchValue.value !== '') {
          searchLocationResult.value = await api.searchLocationByName(searchValue.value);
        }
      } catch (error) {
        searchLocationResult.value = { error: true, message: 'Location not found!' };
      }
      loading.value = false;
    }

    watch(searchValue, () => {
      if (searchValue.value !== '') {
        loading.value = true;
      }
      searchLocationResult.value = null;
    });

    watch(searchValue, debounce(getLocation, 2000));

    return {
      searchValue,
      loading,
      searchLocationResult,
    };
  },
};
</script>

<style lang="sass" scoped>
button
  border: none
  background: none
  font-size: 1rem
  color: #0d6efd
  font-weight: bold

a
  color: inherit
  text-decoration: none

.search
  position: relative
  height: 100%
  width: 100%
  background: #E5E7EB
  border-radius: 10px
  margin-right: .5em
  font-size: 1rem
  transition: .3s box-shadow ease

  &:focus-within
    box-shadow: 0 0 5px rgba(0,0,0,0.5)

  &:focus-within label
    visibility: hidden

  i
    position: absolute
    left: .5em
    color: #9CA3AF

  input
    width: 100%
    height: 2.5em
    border: none
    background: transparent
    padding-left: 2em
    padding-right: 1em
    font-size: inherit
    outline: none

    &:valid ~ label
      visibility: hidden

  label
    position: absolute
    left: 2em
    font-size: inherit
    color: #9CA3AF

</style>
