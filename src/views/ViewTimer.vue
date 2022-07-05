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
        @start-timer="startTimer(idx)"
        @stop-timer="stopTimer(idx)"
        @edit-timer="updateTimerPopup(idx)"
        @reset-timer="resetTimer(idx)"
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
import Timer from '@/services/timer.service'

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
      loading: false
    }
  },

  mounted () {
    this.getTimers()
  },

  methods: {
    async resetTimer (idx) {
      this.timersLoadingStat[idx] = true
      const target = this.timers[idx]
      try {
        const now = new Date().toUTCString()
        const timers = await Timer.updTimerById(target.id,
          {stopped: null, started: now, timeLeft: target.initTimeLeft}
        )
        this.timers = timers
      } finally {
        this.timersLoadingStat[idx] = false
      }
    },
    removeTimer (idx) {
      this.loading = true
      const id = this.timers[idx].id
      Timer.removeTimerById(id)
        .then((timers) => this.timers = timers)
        .finally(() => this.loading = false)
    },
    startTimer (idx) {
      this.timersLoadingStat[idx] = true
      const target = this.timers[idx]
      target.started = new Date().toUTCString()
      target.stopped = null
      Timer.updTimerById(target.id, {started: target.started, stopped: null})
        .then(timers => this.timers = timers)
        .finally(() => this.timersLoadingStat[idx] = false)
    },
    async stopTimer (idx) {
      const stoppedTime = new Date()
      this.timersLoadingStat[idx] = true
      const target = this.timers[idx]
      const startedTime = new Date(target.started)
      const passedTime = stoppedTime - startedTime
      target.stopped = stoppedTime.toUTCString()
      target.timeLeft = target.timeLeft - passedTime
      try {
        const timers = await Timer.updTimerById(target.id, {stopped: target.stopped})
        this.timers = timers
      } finally {
        this.timersLoadingStat[idx] = false
      }
    },
    async updateTimerPopup (idx) {
      await this.stopTimer(idx, new Date().toUTCString())
      this.$emit('toggle-popup', {name: 'popup-timer', props: {...this.timers[idx], title: 'Edit timer:'}})
    },
    addTimerPopup () {
      this.$emit('toggle-popup', {name: 'popup-timer', props:{title: 'Add new timer:'}})
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
        .then(timers => this.timers = timers)
        .finally(() => this.loading = false)
      this.$emit('toggle-popup')
    },
    updateTimer (timer) {
      this.loading = true
      Timer.updTimerById(timer.id, timer)
        .then(timers => this.timers = timers)
        .finally(() => this.loading = false)
      this.$emit('toggle-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
.view-home {
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
