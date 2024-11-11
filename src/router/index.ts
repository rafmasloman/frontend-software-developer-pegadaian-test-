import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Homepage from '../pages/Homepage.vue';
import EditUserPage from '../pages/user/EditUserPage.vue';
import AddUserPage from '../pages/user/AddUserPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Homepage,
    name: 'Homepage',
  },
  {
    path: '/user/add-user',
    component: AddUserPage,
    name: 'AddUserPage',
  },
  {
    path: '/user/:id/edit-user',
    component: EditUserPage,
    name: 'EditUserPage',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
