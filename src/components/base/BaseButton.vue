<template>
  <button
    class="base-button"
    :style="buttonColor"
  >
    {{label}}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    label: String,
    color: String,
    type: String
  },

  computed: {
    buttonColor () {
      if (this.type === 'transparent') {
        return {
          color: this.color ?? 'var(--second-color)',
          borderColor: this.color ?? 'var(--second-color)',
          background: 'none'
        }
      }
      else {
        return {
          backgroundColor: this.color,
          borderColor: this.color
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  font-size: 1.6rem;
  padding: 5px;
  background-color: $second-color;
  border: 1px solid $second-color;
  cursor: pointer;
  border-radius: 1px;
}
</style>
