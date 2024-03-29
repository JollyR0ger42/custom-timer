<template>
  <div
    class="app"
  >
    <app-header
      :user="user"
      @toggle-popup="togglePopup"
      @popup-event="handlePopupEvent"
      @toggle-settings="showSettings = !showSettings"
    ></app-header>

    <app-settings
      v-if="showSettings"
      class="app__settings"
      @toggle-popup="togglePopup"
    />

    <div class="app__content">
      <router-view
        class="app__view"
        @toggle-popup="togglePopup"
        @handle-http-error="handleHttpError"
        @send-notif="sendNotification"
        v-slot="{Component}"
      >
        <component ref="routerRef" :is="Component" />
      </router-view>
    </div>

    <transition name="fade">
      <base-popup
        v-if="showPopup"
        @toggle-popup="togglePopup"
      >
        <component
          :is="popupComponent"
          v-bind="popupProps"
          @popup-event="handlePopupEvent"
          @toggle-popup="togglePopup"
          @handle-http-error="handleHttpError"
        />
      </base-popup>
    </transition>
  </div>
</template>

<script>
import getPopup from '@/services/popup.service.js'
import notif from '@/services/notification.service.js'

export default {
  name: 'App',

  setup () {
    return {
      popupComponent: null,
      popupProps: null
    }
  },

  data () {
    return {
      showPopup: false,
      user: JSON.parse(localStorage.getItem('user')),
      showSettings: false,
    }
  },

  methods: {
    togglePopup (popupPayload) {
      this.popupComponent = null
      this.popupProps = null
      this.showPopup = false

      if (popupPayload?.name) {
        this.popupComponent = getPopup(popupPayload.name)
        this.popupProps = popupPayload?.props
        this.showPopup = true
      }
    },
    setUser (user) {
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
      this.$router.go()
    },
    handlePopupEvent (payload) {
      if (payload?.type === 'newTimer') this.$refs.routerRef?.createNewTimer?.(payload.payload)
      else if (payload?.type === 'updateTimer') this.$refs.routerRef?.updateTimer?.(payload.payload)
      else if (payload?.type === 'setUser') this.setUser(payload.payload)
      else console.log('handlePopupEvent:', payload)
    },
    handleHttpError (error) {
      if (error?.status === 400) this.togglePopup({name: 'popup-info', props: {title: 'Error', body: error?.error}})
      else if (error?.status === 401) this.togglePopup({name: 'popup-auth'})
      else console.log('Http error not handled:', error)
    },
    sendNotification (payload) {
      const notifEnabled = JSON.parse(localStorage.getItem('notifications'))
      if (notifEnabled) notif.send(payload)
    }
  },
}
</script>

<style lang="scss">
.app {
  position: relative;
  background-color: $base-background;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: 100%;

  &__content {
    overflow-y: auto;
    height: 100%;
    display: flex;
  }
}
</style>
