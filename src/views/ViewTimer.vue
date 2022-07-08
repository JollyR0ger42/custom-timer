<template>
  <div class="view-home">
    <base-button
      :tabindex="loading ? -1 : 0"
      label="Add timer"
      @click="addTimerPopup"
    />

    <template v-if="timers.length">
      <AppTimerCard
        ref="cards"
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
        @timer-done="timerDone(idx)"
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
    'handle-http-error': Object,
    'send-notif': Object,
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
        const timers = await Timer.updTimerById(target.id, {
          stopped: now,
          started: null,
          timeLeft: target.initTimeLeft,
          runOutAt: null,
        }
        )
        this.timers = timers
        this.$refs.cards[idx]?.reset()
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
      try {
        const timers = await Timer.updTimerById(target.id, {stopped: stoppedTime.toUTCString()})
        this.timers = timers
      } finally {
        this.timersLoadingStat[idx] = false
      }
    },
    async updateTimerPopup (idx) {
      await this.stopTimer(idx)
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
    async updateTimer (timer) {
      this.loading = true
      this.timers = await Timer.updTimerById(timer.id, timer)
      this.loading = false
      this.$emit('toggle-popup')
    },
    async timerDone (idx) {
      const target = () => this.timers[idx]
      if (!target().runOutAt) await this.updateTimer({id: target().id, runOutAt: new Date().toUTCString()})
      const time = new Date(target().runOutAt).toTimeString()
      const date = new Date(target().runOutAt).toDateString()
      const notification = {
        title: `Timer: ${target().name ?? '(no-name)'} run out at:`,
        body: `${time + ' | ' + date}`
      }
      this.$emit('send-notif', notification)
    }
  }
}
</script>

<style lang="scss" scoped>
.view-home {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
