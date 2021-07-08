import { createRouter, createWebHistory } from 'vue-router';
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/home.vue') },
    { path: '/test', component: () => import('@/views/test.vue') },
    { path: '/emits', component: () => import('@/views/emits.vue') },
  ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export function setupRouter(app) {
  app.use(router);
}
