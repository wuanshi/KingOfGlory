import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:() => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'Categories/create',
        name: 'CategoryEdit',
        component: () => import('../views/category/CategoryEdit')
      },
      {
        path: 'categories/list',
        name: 'CategoryList',
        component: () => import('../views/category/CategoryList')
      },
      {
        path: 'categories/edit/:id',
        name: 'CategoryEdit',
        component: () => import('../views/category/CategoryEdit'),
        // props 设置 使页面能够使用 id 
        props: true
      },
      {
        path: 'items/create',
        name: 'ItemEdit',
        component: () => import('../views/item/ItemEdit')
      },
      {
        path: 'items/list',
        name: 'ItemList',
        component: () => import('../views/item/ItemList')
      },
      {
        path: 'items/edit/:id',
        name: 'ItemEdit',
        component: () => import('../views/item/ItemEdit'),
        // props 设置 使页面能够使用 id 
        props: true
      },
      {
        path: 'heroes/create',
        name: 'HeroEdit',
        component: () => import('../views/hero/HeroEdit')
      },
      {
        path: 'heroes/list',
        name: 'HeroList',
        component: () => import('../views/hero/HeroList')
      },
      {
        path: 'heroes/edit/:id',
        name: 'HeroEdit',
        component: () => import('../views/hero/HeroEdit'),
        // props 设置 使页面能够使用 id 
        props: true
      },
      {
        path: 'articles/create',
        name: 'ArticleEdit',
        component: () => import('../views/article/ArticleEdit')
      },
      {
        path: 'articles/list',
        name: 'ArticleList',
        component: () => import('../views/article/ArticleList')
      },
      {
        path: 'articles/edit/:id',
        name: 'ArticleEdit',
        component: () => import('../views/article/ArticleEdit'),
        // props 设置 使页面能够使用 id 
        props: true
      },

      {
        path: 'ads/create',
        name: 'ArticleEdit',
        component: () => import('../views/ad/AdEdit')
      },
      {
        path: 'ads/list',
        name: 'AdList',
        component: () => import('../views/ad/AdList')
      },
      {
        path: 'ads/edit/:id',
        name: 'AdEdit',
        component: () => import('../views/ad/AdEdit'),
        // props 设置 使页面能够使用 id 
        props: true
      },

      {
        path: 'admin_users/create',
        name: 'AdminUser',
        component: () => import('../views/adminUser/AdminEdit')
      },
      {
        path: 'admin_users/list',
        name: 'AdminList',
        component: () => import('../views/adminUser/AdminList')
      },
      {
        path: 'admin_users/edit/:id',
        name: 'AdminEdit',
        component: () => import('../views/adminUser/AdminEdit'),
        // props 设置 使页面能够使用 id 
        props: true
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loadminUsered when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
