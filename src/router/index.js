import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TargetWeatherView from '../views/TargetWeatherView'
import SearchLogView from '../views/SearchLogView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/weather',
    name: 'weather',
    component: TargetWeatherView
  },

  {
    path: '/searchLog',
    name: 'searchLog',
    component: SearchLogView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
