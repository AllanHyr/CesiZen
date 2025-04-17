const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Accueil
      { path: 'respiration', component: () => import('pages/RespirationPage.vue') }, // Page respiration
      { path: 'login', component: () => import('pages/LoginPage.vue') }, // Page de connexion
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true } // Protégée
      },
      {
        path: 'tracker',
        component: () => import('pages/TrackerPage.vue'),
        meta: { requiresAuth: true } // Protégée
      }
    ]
  },

  // 404 - Page non trouvée
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
