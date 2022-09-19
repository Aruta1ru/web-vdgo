import { createRouter, createWebHistory } from 'vue-router'
import  store  from '../store/index.js'
const HomePage = () => import('../views/HomePage.vue')
const UploadPhoto = () => import('../views/UploadPhoto.vue')
const UploadITD = () => import('../views/UploadITD.vue')
const ClientPage = () => import('../views/ClientPage.vue')
const EquipmentPage = () => import('../views/EquipmentPage.vue')
const LoginPage = () => import('../views/LoginPage.vue')
const TabMenu = () => import('../views/TabMenu.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [ 

  {
    path:'/login',
    name: 'LoginPage',
    component: LoginPage
  }, 

  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { 
      requiresAuth: true
    }
  }, 

  {
    path:'/tabs/',
    beforeEnter: (to, from, next) => {
      if (store.getters.isAdmin) {
        next('/')
      } else {
        next()
      }
    } // если авторизация выполнена под админом, то данные маршруты будут недоступны и выполнится 
      // возврат на главную к списку пользователей
    ,
    redirect:'/tabs/client',
    name: 'TabMenuPage',
    component: TabMenu,
    meta: { 
      requiresAuth: true
    },
    // children это вложенные маршруты
    children: [
      {
        path: 'client',
        name: 'ClientPage',
        component: ClientPage
      }, 
      {
        path:'equipment',
        name: 'EquipmentPage',
        component: EquipmentPage
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