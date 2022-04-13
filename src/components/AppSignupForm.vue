<template>
  <div class="app-signup-form">
    <base-text-input
      placeholder="Username"
      v-model="data.username"
    />
    <base-text-input
      placeholder="Password"
      v-model="data.password"
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
        username: null,
        password: null
      }
    }
  },

  methods: {
    postSignup () {
      Auth.postSignup(this.data)
        .then(result => console.log(result))
        .catch(error => console.error(error))
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
