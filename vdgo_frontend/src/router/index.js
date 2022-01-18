import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UploadPhoto from '../views/UploadPhoto.vue'
import UploadITD from '../views/UploadITD.vue'
import Client from '../views/Client.vue'
import Equipment from '../views/Equipment.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistryPage from '../views/RegistryPage.vue'
import TabMenu from '../views/TabMenu.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

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
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      requiresAuth: true
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
  } // Страница 404  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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