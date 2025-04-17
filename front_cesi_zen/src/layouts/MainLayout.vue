<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          CESIZen
        </q-toolbar-title>

        <q-space />

        <q-btn
          flat
          dense
          color="primary"
          :label="isLoggedIn ? 'Logout' : 'Login'"
          @click="handleAuthAction"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Navigation
        </q-item-label>

        <q-item
          clickable
          v-for="link in availableLinks"
          :key="link.title"
          :to="link.to"
          @click="leftDrawerOpen = false"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

const leftDrawerOpen = ref(false)
const isLoggedIn = ref(false) // Simuler l'état de connexion

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function handleAuthAction() {
  isLoggedIn.value = !isLoggedIn.value
}

// Définir les liens accessibles selon l'état connecté ou pas
const linksPublic = [
  { title: 'Accueil', caption: 'Page d\'informations', icon: 'home', to: '/' },
  { title: 'Respiration', caption: 'Exercice de respiration', icon: 'info', to: '/respiration' },
  { title: 'Connexion', caption: 'Se connecter', icon: 'login', to: '/login' }
]

const linksPrivate = [
  { title: 'Dashboard', caption: 'Votre espace', icon: 'dashboard', to: '/dashboard' },
  { title: 'Tracker d\'émotions', caption: 'Suivi personnel', icon: 'favorite', to: '/tracker' },
  { title: 'Déconnexion', caption: 'Quitter', icon: 'logout', to: '/' }
]

// Selon l'état, on change les liens visibles
const availableLinks = computed(() => isLoggedIn.value ? linksPrivate : linksPublic)
</script>
