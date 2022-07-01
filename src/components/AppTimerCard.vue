<template>
  <div class="app-timer-card">
    <div class="app-timer-card__title">{{name}}</div>
    <span class="app-timer-card__timer">{{timerState}}</span>
    <span class="app-timer-card__init-timer">{{initTimerState}}</span>
    <div class="app-timer-card__buttons">
      <base-button
        :tabindex="(loading || inactive) ? -1 : 0"
        v-if="!isActive"
        label="Start"
        @click="$emit('start-timer', getNow())"
        type="transparent"
      />
      <base-button
        :tabindex="(loading || inactive) ? -1 : 0"
        v-else
        label="Stop"
        @click="$emit('stop-timer', getNow())"
      />
      <base-button
        :tabindex="(loading || inactive) ? -1 : 0"
        type="transparent"
        label="Edit"
        @click="$emit('edit-timer', getNow())"
      />
      <base-button
        :tabindex="(loading || inactive) ? -1 : 0"
        color="red"
        label="Delete"
        @click="$emit('remove-timer')"
      />
    </div>

    <base-loader v-if="loading" />
  </div>
</template>

<script>
import msToObj from '@/helpers/millisecondsToObj.js'

export default {
  name: 'AppTimerCard',

  props: {
    name: String,
    timeLeft: [Number, String],
    initTimeLeft: [Number, String],
    started: String,
    stopped: String,
    loading: Boolean,
    inactive: Boolean
  },

  emits: {
    'remove-timer': null,
    'start-timer': val => val instanceof Date,
    'stop-timer': val => val instanceof Date,
    'edit-timer': val => val instanceof Date,
  },

  data () {
    return {
      intervalId: null,
      localTimeLeft: null
    }
  },

  computed: {
    isActive () {
      if (this.started && !this.stopped) return true
      else return false
    },
    timerState () {
      const {hours, minutes, seconds} = msToObj(this.localTimeLeft)
      return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`
    },
    initTimerState () {
      const {hours, minutes, seconds} = msToObj(this.initTimeLeft)
      return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`
    }
  },

  watch: {
    isActive: {
      immediate: true,
      handler (newVal) {
        if (newVal) { this.startCountdown() }
        else { this.stopCountdown() }
      }
    },
    timeLeft: {
      immediate: true,
      handler (newVal) {this.localTimeLeft = newVal}
    }
  },

  beforeUnmount () {
    this.stopCountdown()
  },
  
  methods: {
    padTime (num) {
      return num.toString().padStart(2, '0')
    },
    getNow () { return new Date() },
    countTime () {
      const startedTime = new Date(this.started)
      const nowTime = new Date()
      const passedTime = nowTime - startedTime
      this.localTimeLeft = +this.timeLeft - passedTime
    },
    startCountdown () {
      this.countTime()
      this.intervalId = setInterval(this.countTime, 1000)
    },
    stopCountdown () {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
</script>

<style lang="scss" scoped>
.app-timer-card {
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 1.6rem;
  border: 2px solid $extra-color;
  padding: 5px;
  margin: 5px;
  z-index: 0;

  &__title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__buttons {
    display: flex;
  }

  &__timer {
    text-align: center;
    font-size: 2rem;
  }

  &__init-timer {
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
  }
}
</style>
