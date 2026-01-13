import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ItemsView from '@/views/ItemsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterVue from '@/views/RegisterVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView,
      meta: {
        requiresAuth: true
      }
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

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && !token){
      next('/login');
    } else {
      next()
    }
})

export default router
