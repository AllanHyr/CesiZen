const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Accueil
      { path: 'respiration', component: () => import('pages/RespirationPage.vue') }, // Respiration
      { path: 'login', component: () => import('pages/LoginPage.vue') }, // Connexion

      // Pages accessibles uniquement aux connectés
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true }, // Protégée
      },
      {
        path: 'tracker',
        component: () => import('pages/TrackerPage.vue'),
        meta: { requiresAuth: true }, // Protégée
      },

      // Pages accessibles à tous
      {
        path: 'activites',
        component: () => import('pages/ActivitesPage.vue'), // Activités de détente
      },
      {
        path: '/activites/:id',
        name: 'activite-detail',
        component: () => import('pages/ActiviteDetailPage.vue'),
      },
      {
        path: 'diagnostique',
        component: () => import('pages/DiagnostiquePage.vue'), // Diagnostique
      },
      {
        path: 'resultat-diagnostique',
        name: 'resultat-diagnostique',
        component: () => import('pages/ResultatDiagnostiquePage.vue'),
      },
    ],
  },

  // 404 - Page non trouvée
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
