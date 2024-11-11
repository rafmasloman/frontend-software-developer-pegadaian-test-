import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Homepage from '../pages/Homepage.vue';
import EditCustomerPage from '../pages/user/EditCustomerPage.vue';
import AddCustomerPage from '../pages/user/AddCustomerPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Homepage,
    name: 'Homepage',
  },
  {
    path: '/customer/add-customer',
    component: AddCustomerPage,
    name: 'AddCustomerPage',
  },
  {
    path: '/customer/:id/edit-customer',
    component: EditCustomerPage,
    name: 'EditCustomerPage',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
