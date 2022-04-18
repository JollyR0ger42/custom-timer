import {defineAsyncComponent, markRaw} from 'vue'

export default (name) => {
  if (name === 'popup-auth') return markRaw(defineAsyncComponent(() => import('@/components/AppSignupForm.vue')))
  if (name === 'popup-info') return markRaw(defineAsyncComponent(() => import('@/components/AppInfoPopup.vue')))
  else return false
}