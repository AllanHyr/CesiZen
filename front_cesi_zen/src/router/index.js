import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const authStore = useAuthStore() // Récupérez l'instance du store ici

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin) {
    // Utilisez l'état actuel du store pour vérifier le rôle
    if (isLoggedIn && authStore.currentUser?.role === 1) {
      next()
    } else {
      alert("Accès réservé à l'administrateur.")
      next('/')
    }
  } else {
    next()
  }
})

export default router
