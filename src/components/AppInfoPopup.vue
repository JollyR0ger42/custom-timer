<template>
  <div class="info-popup">
    <div class="info-popup__title">Error</div>
    <div class="info-popup__body">{{error.error}}</div>
    <base-button
      label="Close"
      @click="$emit('toggle-popup')"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInfoPopup',

  props: {
    error: Object
  },

  emits: {
    'toggle-popup': null
  }
}
</script>

<style lang="scss" scoped>
.info-popup {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  &__body {
    font-size: 2rem;
    margin-bottom: 15px;
  }
}
</style>
