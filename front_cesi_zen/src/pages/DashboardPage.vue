<template>
  <q-page class="q-pa-md flex flex-center">
    <div v-if="isLoading" class="flex flex-center">
      <q-spinner size="50px" color="primary" />
    </div>

    <transition name="fade-slide" appear v-else>
      <div style="max-width: 1200px; width: 100%">
        <q-card class="q-pa-md">
          <!-- Titre Dashboard -->
          <q-card-section>
            <div class="text-h5">Tableau de bord</div>
            <div class="text-subtitle2 q-mt-sm">Bienvenue, {{ userEmail }} !</div>
          </q-card-section>

          <q-separator class="q-my-md" />

          <!-- Historique des émotions -->
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

          <!-- Section Pie Chart -->
          <q-card-section>
            <div class="text-h6 q-mb-md">Répartition des types d'émotions</div>

            <div class="flex flex-center">
              <div style="width: 250px; height: 250px">
                <canvas id="emotionPieChart"></canvas>
              </div>
            </div>
          </q-card-section>

          <q-separator class="q-my-md" />

          <!-- Activités favorites -->
          <q-card-section>
            <div class="text-h6 q-mb-md">Vos activités favorites</div>

            <q-list bordered separator>
              <q-item
                v-for="(activite, index) in activitesFavoris"
                :key="index"
                clickable
                @click="goToActivite(activite.id)"
              >
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
    </transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Chart, registerables } from 'chart.js'
import { useAuthStore } from 'stores/auth'

const auth = useAuthStore()
const router = useRouter()

const userEmail = ref('')
const isLoading = ref(true)
let chartInstance = null

const emotionsHistorique = [
  { date: '2025-04-01', emotion: 'Fierté', type: 'Joie' },
  { date: '2025-04-03', emotion: 'Irritation', type: 'Colère' },
  { date: '2025-04-06', emotion: 'Anxiété', type: 'Peur' },
  { date: '2025-04-08', emotion: 'Tristesse', type: 'Tristesse' },
  { date: '2025-04-10', emotion: 'Étonnement', type: 'Surprise' },
]

const activitesFavoris = [
  { id: 1, titre: 'Méditation guidée' },
  { id: 2, titre: 'Balade en forêt' },
]

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

function goToActivite(id) {
  router.push(`/activites/${id}`)
}

function initPieChart() {
  const ctxPie = document.getElementById('emotionPieChart')?.getContext('2d')
  if (!ctxPie) return

  // Détruire l'ancien graphique si besoin
  if (chartInstance) {
    chartInstance.destroy()
  }

  const typeCounts = {}
  emotionsHistorique.forEach((e) => {
    typeCounts[e.type] = (typeCounts[e.type] || 0) + 1
  })

  chartInstance = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          data: Object.values(typeCounts),
          backgroundColor: [
            '#A2D2FF', // Bleu pastel
            '#FFC8DD', // Rose pastel
            '#CDB4DB', // Mauve pastel
            '#FFAFCC', // Rose clair
            '#B5EAD7', // Vert pastel
            '#E2F0CB', // Vert clair
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  })
}

onMounted(() => {
  userEmail.value = auth.userEmail

  Chart.register(...registerables)

  setTimeout(async () => {
    isLoading.value = false

    await nextTick()
    initPieChart()
  }, 500)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
