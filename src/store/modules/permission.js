import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach((route) => {
    if (route.children != null) {
      route.children.forEach((child) => {
        Object.keys(menus).forEach((key) => {
          if (menus[key] === route.path + '/' + child.path || route.path === '*') {
            res.push(route)
          }
        })
      })
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, info) {
    return new Promise(resolve => {
      let accessedRoutes
      if (info.issuper === 1) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, info.menus)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
