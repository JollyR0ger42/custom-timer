<template>
  <div class="app-signup-form">
    <base-text-input
      placeholder="Username"
      v-model="data.id"
      @keyup.enter="postSignup"
    />
    <base-text-input
      placeholder="Password"
      v-model="data.password"
      @keyup.enter="postSignup"
    />
    <base-button
      label="Sign up"
      @click="postSignup"
    />
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
    'toggle-popup': null
  },

  methods: {
    postSignup () {
      Auth.postSignup(this.data)
        .then(result => console.log(result))
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
}
</style>
