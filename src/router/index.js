import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/AddGoal',
    name: 'AddGoal',
    component: () => import('../views/CreateGoal.vue')
  },
  {
    path: '/AddTask',
    name: 'AddTask',
    component: () => import('../views/AddTask.vue')
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
