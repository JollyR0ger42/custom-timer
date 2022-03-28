<template>
  <div
    class="app"
  >
    <app-header
      @toggle-sidebar="showSidebar = !showSidebar"
    ></app-header>

    <div class="app__content">
      <app-sidebar
        v-if="showSidebar"
        class="app__sidebar"
      ></app-sidebar>

      <router-view
        class="app__view"
        @toggle-popup="togglePopup"
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
          @popup-event="handlePopupEvent"
        />
      </base-popup>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',

  setup () {
    return {
      popupComponent: null
    }
  },

  data () {
    return {
      showSidebar: false,
      showPopup: false,
    }
  },

  computed: {
    routerRef () {return this.$refs.routerRef}
  },

  methods: {
    togglePopup (popupComponent) {
      if (popupComponent) {
        this.popupComponent = popupComponent 
        this.showPopup = true
      } else {
        this.popupComponent = null
        this.showPopup = false
      }
    },
    handlePopupEvent (payload) {
      if (payload?.type === 'newTimer') this.$refs.routerRef?.createNewTimer?.(payload.payload)
      else console.log('handlePopupEvent:', payload)
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
