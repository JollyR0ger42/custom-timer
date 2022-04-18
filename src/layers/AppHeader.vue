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

  <div
    v-if="user && user.id"
    class="app-header__right"
  >
    <span class="app-header__username">
      {{user.id}}
    </span>
    <button
      class="app-header__login"
      @click="authLogout"
    >Logout</button>
  </div>
  <div
    v-else
    class="app-header__right"
  >
    <button
      class="app-header__login"
      @click="authPopup(AppSignupForm)"
    >Sign up</button>
  </div>

</div>
</template>

<script>
import {defineAsyncComponent, markRaw} from 'vue'

export default {
  name: 'AppHeader',

  props: {
    user: Object
  },

  data () {
    return {
      // [KAV]TODO: popups should be smarter than this
      AppSignupForm: markRaw(defineAsyncComponent(() => import('@/components/AppSignupForm.vue')))
    }
  },

  emits: {
    'toggle-sidebar': null,
    'toggle-popup': Object,
    'popup-event': Object
  },

  methods: {
    authPopup (popup) {
      this.$emit('toggle-popup', {component: popup})
    },
    authLogout () {
      this.$emit('popup-event', {type: 'setUser', payload: {}})
    }
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

    @media (max-width: 500px) {
      display: none;
    }
  }

  &__login {
    color: var(--base-color);
    font-size: 2rem;
  }

  &__username {
    color: var(--second-color);
    font-size: 2rem;
  }
}
</style>
