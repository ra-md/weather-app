<template>
  <div>
    <AppHeader>
      <div class="search">
        <i class="fas fa-search center-y"></i>
        <input id="search-input" required="true" v-model="searchValue" @keyup.enter="search" data-test="search-input" type="text">
        <label class="center-y" for="search-input">Press enter to search</label>
      </div>
      <button aria-label="cancel search">
        <router-link to="/">Cancel</router-link>
      </button>
    </AppHeader>
    <div class="container">
      <div v-if="loading">
        <Loading />
      </div>
      <div v-else>
        <SearchResult v-if="searchLocationResult" :locationData="searchLocationResult">
          <p class="location-list-name">Search result</p>
        </SearchResult>
        <SearchHistory v-else>
          <p class="location-list-name">Search history</p>
        </SearchHistory>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import api from '../api';
import AppHeader from '../components/AppHeader.vue';
import SearchResult from '../components/SearchResult.vue';
import SearchHistory from '../components/SearchHistory.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'SearchLocation',
  components: {
    AppHeader,
    SearchResult,
    SearchHistory,
    Loading,
  },
  setup() {
    const searchValue = ref('');
    const searchLocationResult = ref();
    const loading = ref(false);

    watch(searchValue, () => {
      if (searchValue.value === '') {
        searchLocationResult.value = null;
      }
    });

    async function search() {
      loading.value = true;

      try {
        if (searchValue.value !== '') {
          searchLocationResult.value = await api.searchLocationByName(searchValue.value);
        }
      } catch (error) {
        searchLocationResult.value = { error: true, message: 'Location not found!' };
      }

      loading.value = false;
    }

    return {
      searchValue,
      search,
      loading,
      searchLocationResult,
    };
  },
};
</script>

<style lang="sass" scoped>
button
  font-size: 1rem
  color: $blue
  font-weight: bold

a
  color: inherit
  text-decoration: none

.search
  position: relative
  height: 100%
  width: 100%
  background: $secondary
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
    color: $dark-gray

  input
    width: 100%
    height: 2.5em
    border: none
    background: transparent
    padding-left: 2em
    padding-right: 1em
    font-size: inherit
    outline: none
    color: white

    &:valid ~ label
      visibility: hidden

  label
    position: absolute
    left: 2em
    font-size: inherit
    color: $dark-gray
    cursor: text

.location-list-name
  margin-bottom: .75em
  color: $dark-gray
  font-weight: bold
</style>
