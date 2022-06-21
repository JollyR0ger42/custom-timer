<template>
  <div
    class="base-popup"
    @click.self="$emit('toggle-popup')"
  >
    <div class="base-popup__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePopup',

  emits: {
    'toggle-popup': null
  }
}
</script>

<style lang="scss" scoped>
.base-popup {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    padding: 10px;
    background-color: $second-background;
    position: relative;
    z-index: 101;
  }
}
</style>
