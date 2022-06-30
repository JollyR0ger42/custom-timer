import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initBaseComponents from './initBaseComponents.js';
import VueSvgInlinePlugin from "vue-svg-inline-plugin";

const app = createApp(App)
initBaseComponents(app)

app
  .use(store)
  .use(router)
  .use(VueSvgInlinePlugin, {attributes: {data: ['src']}})
app.mount('#app')
