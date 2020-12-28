<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap')

*
  margin: 0
  padding: 0
  box-sizing: border-box

body
  font-family: 'Open Sans', sans-serif
  background-color: $primary
  color: white

img
  width: 100%

button
  border: none
  background: none

.container
  max-width: 800px
  margin: 0 auto
  padding: 0 12px

.center-y
  top: 50%
  transform: translateY(-50%)

.fade-enter-active,
.fade-leave-active
  transition: opacity .3s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
