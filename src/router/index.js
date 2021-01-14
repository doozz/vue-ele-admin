import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/t',
    component: Layout,
    redirect: '/test',
    children: [{
      path: 'test',
      name: 'test',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'test', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/block',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/block/index'),
        name: 'block',
        meta: { title: '敏感词库', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/block/index'),
        name: 'block',
        meta: { title: '测试', icon: 'dashboard', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
