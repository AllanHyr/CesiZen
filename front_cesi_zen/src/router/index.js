import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Protection automatique des routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Si la route demande une auth et que l'utilisateur n'est pas connecté, rediriger vers login
    next('/login')
  } else {
    // Sinon continuer normalement
    next()
  }
})

export default router
