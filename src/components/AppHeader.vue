<template>
  <header>
    <div class="container" data-test="container">
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style lang="sass" scoped>
header
  padding: 12px 0
  z-index: 5
  position: sticky
  top: 0

  .container
    display: flex
    justify-content: space-between
    align-items: center
</style>
