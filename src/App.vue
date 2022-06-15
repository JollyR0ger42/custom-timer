<template>
  <div
    class="app"
  >
    <app-header
      :user="user"
      @toggle-sidebar="showSidebar = !showSidebar"
      @toggle-popup="togglePopup"
      @popup-event="handlePopupEvent"
    ></app-header>

    <div class="app__content">
      <app-sidebar
        v-if="showSidebar"
        class="app__sidebar"
      ></app-sidebar>

      <router-view
        class="app__view"
        @toggle-popup="togglePopup"
        @handle-http-error="handleHttpError"
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
      showSidebar: false,
      showPopup: false,
      user: JSON.parse(localStorage.getItem('user'))
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
    },
    handlePopupEvent (payload) {
      if (payload?.type === 'newTimer') this.$refs.routerRef?.createNewTimer?.(payload.payload)
      else if (payload?.type === 'setUser') this.setUser(payload.payload)
      else console.log('handlePopupEvent:', payload)
    },
    handleHttpError (error) {
      if (error?.status === 400) this.togglePopup({name: 'popup-info', props: {error}})
      else if (error?.status === 401) this.togglePopup({name: 'popup-auth'})
      else console.log('Http error not handled:', error)
    }
  }
}
</script>

<style lang="scss">
.app {
  position: relative;
  height: 100%;
  background-color: $base-background;
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    height: 95%;
  }
}
</style>
