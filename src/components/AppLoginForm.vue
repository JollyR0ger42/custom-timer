<template>
  <div class="app-login-form">
    <base-text-input
      placeholder="Username"
      v-model="data.name"
    />
    <base-text-input
      placeholder="Password"
      v-model="data.password"
    />
    <base-button
      label="Login"
      @click="postLogin"
    />
  </div>
</template>

<script>
import Auth from '@/services/auth.service.js'

export default {
  name: 'AppLoginForm',

  data () {
    return {
      data: {
        name: null,
        password: null
      }
    }
  },

  methods: {
    postLogin () {
      Auth.postLogin(this.data)
        .then(result => localStorage.setItem('user', JSON.stringify(result)))
        .catch(error => console.error(error))
        .finally(() => this.$emit('toggle-popup'))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-login-form {
  display: flex;
  flex-direction: column;
}
</style>
