<template>
  <div class="app-settings">
    <h4  class="app-settings__title">Settings</h4>

    <div>
      <input
        type="checkbox"
        v-model="notifEnabled"
        id="notificationCheck"
        @change="atNotifChange"
      >
      <label for="notificationCheck">Enable notification.</label>
    </div>
  </div>
</template>

<script>
import notif from '@/services/notification.service.js'

export default {
  name: 'AppSettings',

  data () {
    return {
      notifEnabled: localStorage.getItem('notifications')
    }
  },

  methods: {
    atNotifChange () {
      localStorage.setItem('notifications', this.notifEnabled)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-settings {
  background-color: var(--second-background);
  padding: 10px;
  font-size: 1.6rem;

  &__title {
    margin-bottom: 8px;
  }
}
</style>
