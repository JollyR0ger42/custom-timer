<template>
  <div class="new-timer-form">
    <base-text-input
      placeholder="Name"
      v-model="newTimer.name"
      @keyup.enter="addNewTimer"
    />
    <base-text-input
      placeholder="Time"
      v-model.number="newTimer.timeLeft"
      @keyup.enter="addNewTimer"
    />
    <base-button
      label="Add"
      @click="addNewTimer"
    />
  </div>
</template>

<script>
export default {
  name: 'AppNewTimerForm',

  emits: {
    'popup-event': Object
  },

  data () {
    return {
      newTimer: {
        name: 'New Timer',
        timeLeft: 600,
        started: null,
        stopped: null
      }
    }
  },

  methods: {
    addNewTimer () {
      this.newTimer.timeLeft *= 1000
      this.$emit('popup-event', {type: 'newTimer', payload: this.newTimer})
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
