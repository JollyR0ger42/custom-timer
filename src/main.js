import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initBaseComponents from './initBaseComponents.js';

const app = createApp(App)
initBaseComponents(app)

app
  .use(store)
  .use(router)
app.mount('#app')
