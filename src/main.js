import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initBaseComponents from './initBaseComponents.js';
import { FocusTrap } from 'focus-trap-vue';

const app = createApp(App)
initBaseComponents(app)
app.component('FocusTrap', FocusTrap)

app
  .use(store)
  .use(router)
app.mount('#app')
