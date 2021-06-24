import { createStore } from 'vuex';
import home from './modules/home';
const store = createStore({
  modules: {
    home,
  },
  strict: process.env.NODE_ENV !== 'production',
  devtools: true,
});
export function setupStore(app) {
  app.use(store);
}
