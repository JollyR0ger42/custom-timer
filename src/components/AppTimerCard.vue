<template>
  <div class="app-timer-card">
    <div class="app-timer-card__title">{{name}}</div>
    <span>Time left: {{timer}}</span>
    <base-button
      :tabindex="(loading || inactive) ? -1 : 0"
      v-if="!isActive"
      label="Start"
      @click="$emit('start-timer', getNow())"
    />
    <base-button
      :tabindex="(loading || inactive) ? -1 : 0"
      v-if="isActive"
      type="transparent"
      label="Stop"
      @click="$emit('stop-timer', getNow())"
    />
    <base-button
      :tabindex="(loading || inactive) ? -1 : 0"
      color="red"
      label="x"
      @click="$emit('remove-timer')"
    />

    <base-loader v-if="loading" />
  </div>
</template>

<script>
export default {
  name: 'AppTimerCard',

  props: {
    name: String,
    timeLeft: Number,
    started: String,
    stopped: String,
    loading: Boolean,
    inactive: Boolean
  },

  emits: {
    'remove-timer': null,
    'start-timer': val => val instanceof Date,
    'stop-timer': val => val instanceof Date,
  },

  data () {
    return {
      timer: null,
      intervalId: null
    }
  },

  computed: {
    isActive () {
      if (this.started && !this.stopped) return true
      else return false
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
    timeLeft () {
      this.timer = this.timeLeft / 1000
    }
  },

  mounted () {
    if (!this.isActive) this.timer = this.timeLeft / 1000
  },

  beforeUnmount () {
    this.stopCountdown()
  },
  
  methods: {
    getNow () { return new Date() },
    countTime () {
      const startedTime = new Date(this.started)
      const nowTime = new Date()
      const passedTime = nowTime - startedTime
      console.log(`Interval#${this.intervalId} calc`)
      this.timer = Math.floor((this.timeLeft - passedTime) / 1000)
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
  position: relative;
  font-size: 1.6rem;
  border: 2px solid $extra-color;
  padding: 15px;
  margin: 10px;
  z-index: 0;

  &__title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
  }
}
</style>
