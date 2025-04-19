<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 600px; width: 100%">
      <q-card>
        <q-card-section>
          <div class="text-h5">Bienvenue sur CesiZen</div>
          <div class="text-subtitle2 q-mt-sm">Bonjour {{ authStore.userEmail }} 👋</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-mt-md">
          <p>
            Vous êtes connecté sur votre espace personnel. Vous pourrez accéder à vos exercices
            personnalisés, votre historique et plus encore bientôt !
          </p>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn label="Se déconnecter" color="negative" @click="logout" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth' // Importe le store

const router = useRouter()
const authStore = useAuthStore() // Utilise le store

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>
