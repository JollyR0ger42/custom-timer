<template>
<div class="app-header">
  <div class="app-header__left">
    <button
      class="material-icons app-header__sidebar-button"
      @click="$emit('toggle-sidebar')"
    >
      reorder
    </button>
    <span class="app-header__title">
      Timer
    </span>
  </div>

  <div class="app-header__right">
    <button
      class="app-header__login"
      @click="authPopup"
    >Login</button>
    <button class="app-header__login">Sign in</button>
  </div>

</div>
</template>

<script>
import {defineAsyncComponent, markRaw} from 'vue'

export default {
  name: 'AppHeader',

  data () {
    return {
      // [KAV]TODO: popups should be smarter than this
      AppAuthForm: markRaw(defineAsyncComponent(() => import('@/components/AppAuthForm.vue'))),
    }
  },

  emits: {
    'toggle-sidebar': null,
    'toggle-popup': Object
  },

  methods: {
    authPopup () {this.$emit('toggle-popup', this.AppAuthForm)}
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  &__left {
    display: flex;
    align-items: center;
  }

  &__sidebar-button {
    margin-right: 10px;
    color: var(--base-color);
  }

  &__title {
    font-size: 2.5rem;
  }

  &__login {
    color: var(--base-color);
    font-size: 2rem;
  }
}
</style>
