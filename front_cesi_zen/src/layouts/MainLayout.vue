<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> CesiZen </q-toolbar-title>

        <q-space />

        <div v-if="authStore.isLoggedIn" class="q-mr-md">Connecté : {{ authStore.userEmail }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <q-item
          v-for="link in availableLinks"
          :key="link.title"
          clickable
          @click="handleLink(link)"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="confirmLogout">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="logout" color="primary" text-color="white" size="md" class="q-mr-md" />
          <span class="text-h6">Déconnexion</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Êtes-vous sûr de vouloir vous déconnecter ?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="grey" v-close-popup />
          <q-btn flat label="Se déconnecter" color="primary" @click="logoutConfirmed" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

const leftDrawerOpen = ref(false)
const router = useRouter()
const $q = useQuasar()
const confirmLogout = ref(false)
const authStore = useAuthStore()

const isAdmin = computed(() => authStore.isAdmin)
const isLoggedIn = computed(() => authStore.isLoggedInGetter)

const publicLinks = ref([
  { title: 'Accueil', icon: 'home', to: '/' },
  { title: 'Respiration', icon: 'spa', to: '/respiration' },
  { title: 'Activités de détente', icon: 'self_improvement', to: '/activites' },
  { title: 'Diagnostique', icon: 'psychology', to: '/diagnostique' },
  { title: 'Se connecter', icon: 'login', to: '/login' },
])

const basePrivateLinks = ref([
  { title: 'Accueil', icon: 'home', to: '/' },
  { title: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { title: 'Respiration', icon: 'spa', to: '/respiration' },
  { title: 'Activités de détente', icon: 'self_improvement', to: '/activites' },
  { title: 'Diagnostique', icon: 'psychology', to: '/diagnostique' },
  { title: "Tracker d'émotions", icon: 'favorite', to: '/tracker' },
  { title: 'Se déconnecter', icon: 'logout', action: () => (confirmLogout.value = true) },
])

const privateLinksWithAdmin = computed(() => {
  const links = [...basePrivateLinks.value]
  if (isAdmin.value) {
    links.push({ title: 'Admin', icon: 'admin_panel_settings', to: '/admin' })
  }
  return links
})

const availableLinks = computed(() =>
  isLoggedIn.value ? privateLinksWithAdmin.value : publicLinks.value,
)

// Gestion de clic sur un lien
function handleLink(link) {
  if (link.action) {
    link.action()
  } else {
    router.push(link.to)
    leftDrawerOpen.value = false
  }
}

// Déconnexion
function logout() {
  authStore.logout()
  router.push('/login')

  $q.notify({
    type: 'positive',
    message: 'Vous avez été déconnecté avec succès !',
    position: 'top-right',
  })
}

// Déconnexion confirmée (si tu gardes la popup)
function logoutConfirmed() {
  logout() // Appelle la fonction de déconnexion du store
  confirmLogout.value = false
}

// Ouvrir/Fermer le menu
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Pas besoin de handleLoginSuccess ici, l'état est géré par Pinia
</script>
