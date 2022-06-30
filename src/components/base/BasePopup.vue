<template>
  <div
    class="base-popup"
    @click.self="$emit('toggle-popup')"
  >
    <focus-trap :active="false" ref="focusTrap">
      <div class="base-popup__content">
        <slot></slot>
      </div>
    </focus-trap>
  </div>
</template>

<script>
export default {
  name: 'BasePopup',

  emits: {
    'toggle-popup': null
  },

  data () {
    return {
      intervalId: null,
      ATTEMPTS: 10,
      DELAY: 500, // in ms,
      attempt: 0
    }
  },

  mounted () {
    this.intervalId = setInterval(() => {
      this.trapFocus()
      this.attempt++
      if (this.attempt >= this.ATTEMPTS) clearInterval(this.intervalId)
    }, this.DELAY)
  },

  methods: {
    trapFocus () {
      try {
        this.$refs.focusTrap.activate()
        clearInterval(this.intervalId)
      } catch (e) {
        console.error('BasePopup: focus not catched.')
      }
    }
  },
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
