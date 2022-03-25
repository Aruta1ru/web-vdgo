import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const Home = () => import('../views/Home.vue')
const UploadPhoto = () => import('../views/UploadPhoto.vue')
const UploadITD = () => import('../views/UploadITD.vue')
const Client = () => import('../views/Client.vue')
const Equipment = () => import('../views/Equipment.vue')
const LoginPage = () => import('../views/LoginPage.vue')
const RegistryPage = () => import('../views/RegistryPage.vue')
const TabMenu = () => import('../views/TabMenu.vue')
const NotFound = () => import('../views/NotFound.vue')
const accessDenied = () => import('../views/accessDenied.vue')

const routes = [
  {
    path:'/login',
    name: 'LoginPage',
    component: LoginPage
  }, 

  { 
    path: '/registry',
    name: 'RegistryPage',
    component: RegistryPage,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAdmin) {
        next()
      } else {
        next('accessDenied') //переадресация на accessDenied, если это USER
      }
    },
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      requiresAuth: true,
    }
  }, 

  {
    path:'/tabs/',
    redirect:'/tabs/client',
    name: 'TabMenu',
    component: TabMenu,
    meta: { 
      requiresAuth: true
    },
    // children это вложенные маршруты
    children: [
      {
        path: 'client',
        name: 'Client',
        component: Client
      }, 
      {
        path:'equipment',
        name: 'Equipment',
        component: Equipment
      }, 
      {
        path:'gallery',    
        name: 'UploadPhoto',
        component: UploadPhoto
      },
      {
        path:'itd',    
        name: 'UploadITD',
        component: UploadITD
      }
    ]
  },

  { 
    path: '/:pathMatch(.*)*', 
    name:'404',
    component: NotFound 
  }, // Страница 404
  
  
  { 
    path: '/accessDenied', 
    name:'accessDenied',
    component: accessDenied 
  } // Страница недостаточно прав для регистрации пользователя  

]

const router = createRouter({ 
  history: createWebHistory(),
  scrollBehavior() {
    // всегда при переходе будет возврат к верхушке страницы
    return { top: 0 }
  },
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router