<template>
  <q-page class="q-pa-md flex flex-center">
    <div style="max-width: 1200px; width: 100%">
      <q-card class="q-pa-md">
        <!-- Titre du Dashboard -->
        <q-card-section>
          <div class="text-h5">Tableau de bord</div>
          <div class="text-subtitle2 q-mt-sm">Bienvenue, {{ userEmail }} !</div>
        </q-card-section>

        <q-separator class="q-my-md" />

        <!-- Section Historique des émotions -->
        <q-card-section>
          <div class="text-h6 q-mb-md">Historique de vos émotions du mois</div>

          <q-list bordered separator>
            <q-item v-for="(emotion, index) in emotionsHistorique" :key="index">
              <q-item-section avatar>
                <q-icon :name="emotionIcon(emotion.type)" :color="emotionColor(emotion.type)" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ emotion.emotion }}</q-item-label>
                <q-item-label caption>{{ emotion.date }} - {{ emotion.type }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator class="q-my-md" />

        <!-- Section Activités favorites -->
        <q-card-section>
          <div class="text-h6 q-mb-md">Vos activités favorites</div>

          <q-list bordered separator>
            <q-item v-for="(activite, index) in activitesFavoris" :key="index">
              <q-item-section avatar>
                <q-icon name="spa" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ activite.titre }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center" class="q-mt-md">
          <q-btn label="Retour accueil" color="primary" to="/" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'stores/auth'

// Store PINIA
const auth = useAuthStore()
const userEmail = ref('')

// Données simulées - Historique émotions
const emotionsHistorique = [
  { date: '2025-04-01', emotion: 'Fierté', type: 'Joie' },
  { date: '2025-04-03', emotion: 'Irritation', type: 'Colère' },
  { date: '2025-04-06', emotion: 'Anxiété', type: 'Peur' },
  { date: '2025-04-08', emotion: 'Tristesse', type: 'Tristesse' },
  { date: '2025-04-10', emotion: 'Étonnement', type: 'Surprise' },
]

// Données simulées - Activités favorites
const activitesFavoris = [
  { id: 1, titre: 'Méditation guidée' },
  { id: 2, titre: 'Balade en forêt' },
]

// Fonction pour récupérer la couleur par type d'émotion
function emotionColor(type) {
  switch (type) {
    case 'Joie':
      return 'green'
    case 'Colère':
      return 'red'
    case 'Peur':
      return 'orange'
    case 'Tristesse':
      return 'blue'
    case 'Surprise':
      return 'purple'
    case 'Dégoût':
      return 'brown'
    default:
      return 'grey'
  }
}

// (Optionnel) Fonction pour choisir une icône différente par type
function emotionIcon(type) {
  switch (type) {
    case 'Joie':
      return 'mood'
    case 'Colère':
      return 'sentiment_very_dissatisfied'
    case 'Peur':
      return 'report_problem'
    case 'Tristesse':
      return 'mood_bad'
    case 'Surprise':
      return 'emoji_objects'
    case 'Dégoût':
      return 'sick'
    default:
      return 'help_outline'
  }
}

onMounted(() => {
  userEmail.value = auth.userEmail
})
</script>
