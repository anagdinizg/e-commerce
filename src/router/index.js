import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/produto/:id',
      name: 'product',
      component: ProductView,
      props: true,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
