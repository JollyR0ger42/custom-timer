<template>
  <div class="new-timer-form">
    <base-text-input
      label="Label:"
      placeholder="Timer label"
      v-model="newTimer.name"
      @keyup.enter="addNewTimer"
    />
    <div class="new-timer-form__time-input">
      <base-text-input
        label="Hours:"
        placeholder="hours"
        v-model.number="timeObj.hours"
        @keyup.enter="addNewTimer"
        type="number"
      />
      <base-text-input
        label="Minutes:"
        placeholder="minutes"
        v-model.number="timeObj.minutes"
        @keyup.enter="addNewTimer"
        type="number"
      />
      <base-text-input
        label="Seconds:"
        placeholder="seconds"
        v-model.number="timeObj.seconds"
        @keyup.enter="addNewTimer"
        type="number"
      />
    </div>
    <div class="new-timer-form__buttons">
      <base-button
        label="Add"
        @click="addNewTimer"
      />
      <base-button
        color="red"
        label="Cancel"
        @click="$emit('toggle-popup')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTimerForm',

  emits: {
    'popup-event': Object
  },

  data () {
    return {
      newTimer: {
        name: null,
        timeLeft: null,
        started: null,
        stopped: null
      },
      timeObj: {
        hours: null,
        minutes: null,
        seconds: null
      }
    }
  },

  methods: {
    addNewTimer () {
      this.newTimer.timeLeft = this.getSeconds() * 1000 // in miliseconds
      this.$emit('popup-event', {type: 'newTimer', payload: this.newTimer})
    },
    getSeconds () {
      const seconds = this.timeObj.seconds ?? 0
      const minutes = (this.timeObj.minutes ?? 0) * 60 // in seconds
      const hours = (this.timeObj.hours ?? 0) * 60 * 60 // in seconds
      return seconds + minutes + hours
    }
  }
}
</script>

<style lang="scss" scoped>
.new-timer-form {
  display: flex;
  flex-direction: column;
  width: 250px;
  font-size: 0.9rem;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  &__time-input {
    display: flex;
    width: 100%;
    justify-content: space-between;

    & > * {
      width: 31%;
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
