<template>
  <div class="app-login-form">
    <base-text-input
      placeholder="Username"
      v-model="data.username"
    />
    <base-text-input
      placeholder="Password"
      v-model="data.password"
    />
    <base-button
      label="Login"
    />
  </div>
</template>

<script>
export default {
  name: 'AppLoginForm',

  data () {
    return {
      data: {
        username: null,
        password: null
      }
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
