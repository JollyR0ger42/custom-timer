<template>
  <div class="app-signin-form">
    <base-text-input
      placeholder="Username"
      v-model="data.username"
    />
    <base-text-input
      placeholder="Password"
      v-model="data.password"
    />
    <base-button
      label="Sign in"
    />
  </div>
</template>

<script>
export default {
  name: 'AppSigninForm',

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
.app-signin-form {
  display: flex;
  flex-direction: column;
}
</style>
