<template>
<div class="app-header">
  <div class="app-header__left">
    <button
      v-if="true"
      class="app-header__sidebar-button"
      @click="$emit('toggle-settings')"
    >
      <icon-reorder class="app-header__sidebar-button__icon" />
    </button>
    <span class="app-header__title">
      Timer
    </span>
  </div>

  <div v-if="showAuth" class="app-header__auth">
    <div v-if="user && user.id">
      <span class="app-header__username">
        {{user.id}}
      </span>
      <button
        class="app-header__login"
        @click="authLogout"
      >Logout</button>
    </div>
    <div v-else>
      <button
        class="app-header__login"
        @click="authPopup('popup-auth')"
      >Sign up</button>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'AppHeader',

  props: {
    user: Object
  },

  emits: {
    'toggle-settings': null,
    'toggle-popup': Object,
    'popup-event': Object
  },

  data () {
    return {
      showAuth: !!process.env.VUE_APP_SERVER
    }
  },

  methods: {
    authPopup (name) {
      this.$emit('toggle-popup', {name})
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
    padding: 0;
    width: 30px;
    height: 30px;

    &__icon {
      fill: var(--base-color);
    }
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
