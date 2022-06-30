<template>
<div class="base-text-input">
  <label class="base-text-input__label" for="input">{{label}}</label>
  <div class="base-text-input__wrapper">
    <input
      class="base-text-input__field"
      name="input"
      :type="_type"
      v-model="value"
      :placeholder="placeholder"
      autocomplete="off"
    />
    <base-visibility-icon
      tabindex="0"
      :status="showPassword"
      v-if="type === 'password'"
      class="base-text-input__field__vis-icon"
      @click="togglePasswordVis"
      @keyup.enter.stop="togglePasswordVis"
      @keyup.space="togglePasswordVis"
    />
  </div>
</div>
</template>

<script>
export default {
  name: 'BaseTextInput',

  props: {
    modelValue: [String, Number],
    placeholder: [String, Number],
    label: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  emits: {
    'update:modelValue': [String, Number]
  },

  computed: {
    value: {
      get () {return this.modelValue},
      set (newVal) {this.$emit('update:modelValue', newVal)}
    },
    _type () {
      if (this.type === 'password' && this.showPassword)
        return 'text'
      else return this.type
    }
  },

  data () {
    return {
      showPassword: false
    }
  },

  methods: {
    togglePasswordVis () {
      this.showPassword = !this.showPassword
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

    &__vis-icon {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 2px;
      right: 5px;
    }
  }

  &__wrapper {
    position: relative;
  }
}
</style>
