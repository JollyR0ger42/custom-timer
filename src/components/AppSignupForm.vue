<template>
  <div class="app-signup-form">
    <base-text-input
      placeholder="Username"
      v-model="data.id"
      @keyup.enter="postLogin"
    />
    <base-text-input
      placeholder="Password"
      v-model="data.password"
      @keyup.enter="postLogin"
      type="password"
    />
    <div class="app-signup-form__buttons">
      <base-button
        label="Sign up"
        @click="postSignup"
      />
      <base-button
        label="Login"
        @click="postLogin"
      />
    </div>
  </div>
</template>

<script>
import Auth from '@/services/auth.service.js'

export default {
  name: 'AppSignupForm',

  data () {
    return {
      data: {
        id: null,
        password: null
      }
    }
  },

  emits: {
    'toggle-popup': null,
    'popup-event': Object,
    'handle-http-error': Object
  },

  methods: {
    postSignup () {
      Auth.postSignup(this.data)
        .then(result => {
          console.log(result)
          this.$emit('toggle-popup')
        })
        .catch(error => {
          if (error?.status) this.$emit('handle-http-error', error)
          else console.error('Error:', error)
        })
    },
    postLogin () {
      Auth.postLogin(this.data)
        .then(result => this.$emit('popup-event', {type: 'setUser', payload: result}))
        .catch(error => console.error(error))
        .finally(() => this.$emit('toggle-popup'))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-signup-form {
  display: flex;
  flex-direction: column;

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
