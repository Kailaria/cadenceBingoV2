import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import UpdateLog from '@/views/UpdateLog.vue'
import BingoGenerator from '@/views/BingoGenerator.vue'
import GoalsLibrary from '@/views/GoalsLibrary.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/updates/:date?',
    name: 'Update Log',
    component: UpdateLog
  },
  {
    path: '/bingo-generator/:seed?',
    name: 'Bingo Generator',
    component: BingoGenerator
  },
  {
    path: '/goals-library',
    name: 'Goals Library',
    component: GoalsLibrary
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
