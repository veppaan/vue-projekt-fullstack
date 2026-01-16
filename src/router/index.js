import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ItemsView from '@/views/ItemsView.vue'
import LoginView from '@/views/LoginView.vue'
import AddView from '@/views/AddView.vue'
import EditView from '@/views/EditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import RegisterView from '@/views/RegisterView.vue'

//Alla routers för alla sidor
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add',
      name: 'add',
      component: AddView,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFoundView }
  ],
})
//Kollar om det finns token
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && !token){
      next('/login');
    } else {
      next()
    }
})

export default router
