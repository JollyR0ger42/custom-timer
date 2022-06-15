<template>
  <div class="view-home">
    <base-button
      :tabindex="loading ? -1 : 0"
      label="Add timer"
      @click="addTimerPopup"
    />

    <template v-if="timers.length">
      <AppTimerCard
        v-for="(timer, idx) in timers"
        :key="idx"
        v-bind="timer"
        :loading="timersLoadingStat[idx]"
        :inactive="loading"
        @remove-timer="removeTimer(idx)"
        @start-timer="(startedTime) => startTimer(idx, startedTime)"
        @stop-timer="(stoppedTime) => stopTimer(idx, stoppedTime)"
      />

      <base-button
        :tabindex="loading ? -1 : 0"
        label="Add timer"
        @click="addTimerPopup"
      />
    </template>

    <base-loader v-if="loading" />
  </div>
</template>

<script>
import AppTimerCard from '@/components/AppTimerCard.vue'
import Timer from '@/services/timer.service.js'
import {defineAsyncComponent, markRaw} from 'vue'

export default {
  name: 'ViewTimer',

  components: {
    AppTimerCard
  },

  emits: {
    'toggle-popup': Object,
    'handle-http-error': Object
  },

  data () {
    return {
      timers: [],
      timersLoadingStat: [],
      // [KAV]TODO: popups should be smarter than this
      AppNewTimerForm: markRaw(defineAsyncComponent(() => import('@/components/AppNewTimerForm.vue'))),
      loading: false
    }
  },

  mounted () {
    this.getTimers()
  },

  methods: {
    removeTimer (idx) {
      this.loading = true
      const id = this.timers[idx].id
      Timer.removeTimerById(id)
        .then((timers) => this.timers = timers)
        .finally(() => this.loading = false)
    },
    startTimer (idx, startedTime) {
      this.timersLoadingStat[idx] = true
      const target = this.timers[idx]
      target.started = startedTime.toUTCString()
      target.stopped = null
      Timer.updTimerById(target.id, {started: target.started})
        .then(timer => this.timers.splice(idx, 1, timer))
        .finally(() => this.timersLoadingStat[idx] = false)
    },
    stopTimer (idx, stoppedTime) {
      this.timersLoadingStat[idx] = true
      const target = this.timers[idx]
      const startedTime = new Date(target.started)
      const passedTime = stoppedTime - startedTime
      target.stopped = stoppedTime.toUTCString()
      target.timeLeft = target.timeLeft - passedTime
      Timer.updTimerById(target.id, {stopped: target.stopped})
        .then(timer => this.timers.splice(idx, 1, timer))
        .finally(() => this.timersLoadingStat[idx] = false)
    },
    addTimerPopup () {
      this.$emit('toggle-popup', {component: this.AppNewTimerForm})
    },
    getTimers () {
      this.loading = true
      Timer.getTimers()
        .then(timers => this.timers = timers)
        .catch(error => {
          if (error.status === 401) this.$emit('handle-http-error', error)
          else console.error('Error:', error)
        })
        .finally(() => this.loading = false)
    },
    createNewTimer (newTimer) {
      this.loading = true
      Timer.newTimer(newTimer)
        .then(timer => this.timers.push(timer))
        .finally(() => this.loading = false)
      this.$emit('toggle-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
.view-home {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: overlay;
  position: relative;
}
</style>
