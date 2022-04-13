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
    />
  </div>
</template>

<script>
export default {
  name: 'AppSignupForm',

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
.app-signup-form {
  display: flex;
  flex-direction: column;
}
</style>
