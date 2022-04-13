<template>
  <div class="new-timer-form">
    <base-text-input
      placeholder="Username"
      v-model="data.username"
    />
    <base-text-input
      placeholder="Password"
      v-model="data.password"
    />
    <base-button
      :label="label"
    />
  </div>
</template>

<script>
export default {
  name: 'AppAuthForm',

  props: {
    label: String
  },

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
.new-timer-form {
  display: flex;
  flex-direction: column;
}
</style>
