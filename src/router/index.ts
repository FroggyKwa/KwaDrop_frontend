import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFoundView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/room/:room_id',
    name: 'room',
    component: () => import('../views/RoomView.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
