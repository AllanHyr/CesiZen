<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h5">Questionnaire Diagnostique</div>
        <div class="text-subtitle2 q-mt-sm">Sélectionnez les événements vécus récemment :</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="submitForm" class="row">
          <q-checkbox
            v-for="event in evenements"
            :key="event.id"
            v-model="selectedEvents"
            :label="event.label"
            :val="event"
            class="q-mb-sm col-12 col-md-5 col-sm-12"
          />

          <q-btn
            label="Valider le questionnaire"
            color="primary"
            type="submit"
            class="q-mt-md full-width"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { calculerScore } from 'src/utils/calculerScore'

const router = useRouter()

// Données simulées JSON pour événements
const evenements = [
  { id: 1, label: 'Décès du conjoint', value: 100 },
  { id: 2, label: 'Divorce', value: 73 },
  { id: 3, label: 'Séparation', value: 65 },
  { id: 4, label: 'Séjour en prison', value: 63 },
  { id: 5, label: 'Décès d’un proche parent', value: 63 },
  { id: 6, label: 'Maladies ou blessures personnelles', value: 53 },
  // Ajoute-en d'autres si besoin
]

// Données simulées JSON pour résultats
const resultats = [
  { text: 'Stress faible – Votre niveau de stress est maîtrisé.', min_value: 0, max_value: 149 },
  {
    text: 'Stress modéré – Votre stress commence à impacter votre bien-être.',
    min_value: 150,
    max_value: 199,
  },
  {
    text: 'Stress élevé – Votre niveau de stress est préoccupant.',
    min_value: 200,
    max_value: 299,
  },
  { text: 'Stress très élevé – Votre stress est critique.', min_value: 300, max_value: 600 },
]

const selectedEvents = ref([])

function submitForm() {
  // Calculer la somme des valeurs sélectionnées
  const totalScore = calculerScore(selectedEvents.value)

  // Trouver le résultat correspondant
  const resultat = resultats.find((r) => totalScore >= r.min_value && totalScore <= r.max_value)

  if (resultat) {
    // Rediriger vers la page de résultat en passant l'objet resultat
    router.push({
      name: 'resultat-diagnostique',
      query: { text: resultat.text, score: totalScore },
    })
  } else {
    alert('Aucun résultat trouvé pour ce score.')
  }
}
</script>
