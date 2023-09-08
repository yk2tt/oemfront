import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'
const routes = [
  //登入页面路由
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/pages/login.vue'),
  },


  {
    path: '/',
    name: 'layOut',
    component: () => import('../views/LayOut/LayOut.vue'),
    redirect: "/index",
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/pages/index.vue')
      }, {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/pages/rolesList.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/pages/userList.vue')
      },
      {
        path: '/shjl',
        name: 'shjl',
        component: () => import('../views/pages/OEM/shjl.vue')
      },
      {
        path: '/saplist',
        name: 'saplist',
        component: () => import('../views/pages/OEM/saplist.vue')
      },
      {
        path: '/shjh',
        name: 'shjh',
        component: () => import('../views/pages/OEM/shjh.vue')
      },
      {
        path: '/scrk',
        name: 'scrk',
        component: () => import('../views/pages/OEM/scrk.vue')
      },
      {
        path: '/scrkhd',
        name: 'scrkhd',
        component: () => import('../views/pages/OEM/scrkhd.vue')
      },
      {
        path: '/jiesuan',
        name: 'jiesuan',
        component: () => import('../views/pages/OEM/jiesuan.vue')
      },
      {
        path: '/kucun',
        name: 'kucun',
        component: () => import('../views/pages/OEM/kucun.vue')
      },
      {
        path: '/rpchenpin',
        name: 'rpchenpin',
        component: () => import('../views/pages/report/chenpin.vue')
      },
      {
        path: '/rpzhuancang',
        name: 'rpzhuancang',
        component: () => import('../views/pages/report/zhuancang.vue')
      },
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.getItem('loginDate')) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
