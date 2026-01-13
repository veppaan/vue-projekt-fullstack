import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ItemsView from '@/views/ItemsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterVue from '@/views/RegisterVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
    ,
    {
      path: '/register',
      name: 'register',
      component: RegisterVue
    }
  ],
})

export default router
