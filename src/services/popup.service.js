import {defineAsyncComponent, markRaw} from 'vue'

export default (name) => {
  if (name === 'popup-auth') return markRaw(defineAsyncComponent(() => import('@/components/AppSignupForm.vue')))
  else return false
}