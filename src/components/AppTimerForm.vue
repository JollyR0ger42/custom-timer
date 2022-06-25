<template>
  <div class="new-timer-form">
    <base-text-input
      label="Label:"
      placeholder="Timer label"
      v-model="timer.name"
      @keyup.enter="atSubmit"
    />
    <div class="new-timer-form__time-input">
      <base-text-input
        label="Hours:"
        placeholder="hours"
        v-model.number="timeObj.hours"
        @keyup.enter="atSubmit"
        type="number"
      />
      <base-text-input
        label="Minutes:"
        placeholder="minutes"
        v-model.number="timeObj.minutes"
        @keyup.enter="atSubmit"
        type="number"
      />
      <base-text-input
        label="Seconds:"
        placeholder="seconds"
        v-model.number="timeObj.seconds"
        @keyup.enter="atSubmit"
        type="number"
      />
    </div>
    <div class="new-timer-form__buttons">
      <base-button
        label="Ok"
        @click="atSubmit"
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
import msToObj from '@/helpers/millisecondsToObj.js'

export default {
  name: 'AppTimerForm',

  emits: {
    'popup-event': Object,
    'toggle-popup': null
  },

  props: {
    name: String,
    timeLeft: Number,
    id: [String, Number],
  },

  data () {
    return {
      timer: {
        id: this.id ?? null,
        name: this.name ?? null,
        timeLeft: this.timeLeft ?? null
      },
      timeObj: msToObj(this.timeLeft)
    }
  },

  methods: {
    atSubmit () {
      this.timer.timeLeft = this.getSeconds() * 1000 // in miliseconds
      if (this.timeLeft) {
        this.$emit('popup-event', {type: 'updateTimer', payload: this.timer})
      } else {
        this.$emit('popup-event', {type: 'newTimer', payload: this.timer})
      }
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
