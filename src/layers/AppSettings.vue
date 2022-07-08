<template>
  <div class="app-settings">
    <h4  class="app-settings__title">Settings</h4>

    <div
      @click="atNotifChange"
      class="app-settings__row"
    >
      <base-checkbox
        :checked="notifEnabled"
        class="app-settings__checkbox"
      />
      <label>Enable notification.</label>
    </div>
  </div>
</template>

<script>
import notif from '@/services/notification.service.js'

export default {
  name: 'AppSettings',

  data () {
    return {
      notifEnabled: JSON.parse(localStorage.getItem('notifications'))
    }
  },

  methods: {
    atNotifChange () {
      this.notifEnabled = !this.notifEnabled
      // if (notif.isPermited()) {
      //   localStorage.setItem('notifications', this.notifEnabled)
      // } else {
      //   notif.askPermission()
      // }
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
    display: inline-block;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__checkbox {
    font-size: 18px;
    margin-right: 5px;
  }
}
</style>
