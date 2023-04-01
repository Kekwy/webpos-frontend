import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";

// 安装路由
Vue.use(VueRouter)

// 定义路由
const routes = [
  {
    path: '/',
    name: 'login',
    // 路由的组件
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    // 路由的组件
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
