import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router, setupRouter } from './router/index';
import { setupStore } from './store/index';
async function appInit() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  await router.isReady();
  app.mount('#app');
}
appInit();
