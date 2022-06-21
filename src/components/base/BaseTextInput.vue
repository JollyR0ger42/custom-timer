<template>
<div class="base-text-input">
  <label class="base-text-input__label" for="input">{{label}}</label>
  <input
    class="base-text-input__field"
    name="input"
    type="text"
    v-model="value"
    :placeholder="placeholder"
    autocomplete="off"
  />
</div>
</template>

<script>
export default {
  name: 'BaseTextInput',

  props: {
    modelValue: [String, Number],
    placeholder: [String, Number],
    label: String
  },

  emits: {
    'update:modelValue': [String, Number]
  },

  computed: {
    value: {
      get () {return this.modelValue},
      set (newVal) {this.$emit('update:modelValue', newVal)}
    }
  }
}
</script>

<style lang="scss" scoped>
.base-text-input {
  display: flex;
  flex-direction: column;

  &__label {
    font-size: 1.6em;
    margin-bottom: 5px;
  }

  &__field {
    font-size: 1.6em;
    &::placeholder {
      opacity: 0.5;
    }
  }
}
</style>
