<template>
  <q-page class="q-pa-md flex flex-center">
    <div style="max-width: 800px; width: 100%">
      <q-card class="q-pa-md">
        <!-- Image de l'activité -->
        <q-img :src="activite?.image || defaultImage" ratio="16/9" class="rounded-borders q-mb-md">
          <div class="absolute-bottom text-subtitle1 text-white bg-primary q-pa-sm">
            {{ activite?.titre || 'Activité inconnue' }}
          </div>
        </q-img>

        <!-- Contenu de l'activité -->
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ activite?.titre || 'Activité inconnue' }}</div>

          <div class="text-body2 q-mb-md">
            {{ activite?.description || 'Aucune description disponible pour cette activité.' }}
          </div>
        </q-card-section>

        <!-- Boutons -->
        <q-card-actions align="center" class="q-mt-md">
          <q-btn
            v-if="isLoggedIn"
            :label="activite?.isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'"
            :color="activite?.isFavori ? 'negative' : 'primary'"
            @click="toggleFavori"
          />
          <q-btn label="Retour aux activités" flat @click="goBack" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const isLoggedIn = computed(() => auth.isLoggedIn)

const activite = ref(null)

// Image par défaut
const defaultImage = 'https://cdn.quasar.dev/img/mountains.jpg'

// Données simulées
const activitesDisponibles = [
  {
    id: 1,
    titre: 'Méditation guidée',
    description: 'Prenez un moment pour vous recentrer en toute tranquillité.',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    isFavori: true,
  },
  {
    id: 2,
    titre: 'Balade en forêt',
    description: 'Respirez l’air frais de la nature et reconnectez-vous.',
    image: 'https://cdn.quasar.dev/img/quasar.jpg',
    isFavori: true,
  },
  {
    id: 3,
    titre: 'Atelier de peinture',
    description: 'Exprimez vos émotions par la couleur et la créativité.',
    image: 'https://cdn.quasar.dev/img/material.png',
    isFavori: false,
  },
  {
    id: 4,
    titre: 'Exercice de respiration',
    description: 'Maîtrisez votre souffle pour mieux gérer votre stress.',
    image: 'https://cdn.quasar.dev/img/avatar4.jpg',
    isFavori: false,
  },
  {
    id: 5,
    titre: 'Lecture relaxante',
    description: 'Détendez-vous avec une histoire inspirante.',
    image: 'https://cdn.quasar.dev/img/avatar3.jpg',
    isFavori: false,
  },
  {
    id: 6,
    titre: 'Cours de yoga',
    description: 'Combinez souplesse et sérénité pour un bien-être complet.',
    image: 'https://cdn.quasar.dev/img/avatar2.jpg',
    isFavori: false,
  },
]

onMounted(() => {
  const id = parseInt(route.params.id)
  activite.value = activitesDisponibles.find((a) => a.id === id)
})

function toggleFavori() {
  if (activite.value) {
    activite.value.isFavori = !activite.value.isFavori
  }
}

function goBack() {
  router.push('/activites')
}
</script>
