<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h5">Questionnaire Diagnostique</div>
        <div class="text-subtitle2 q-mt-sm">Sélectionnez les événements vécus récemment :</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="submitForm">
          <q-checkbox
            v-for="(event, index) in evenements"
            :key="index"
            v-model="selectedEvents"
            :label="event.label"
            :val="event.value"
            class="q-mb-sm"
          />

          <q-btn label="Valider le questionnaire" color="primary" type="submit" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données simulées JSON pour événements
const evenements = [
  { label: 'Décès du conjoint', value: 100 },
  { label: 'Divorce', value: 73 },
  { label: 'Séparation', value: 65 },
  { label: 'Séjour en prison', value: 63 },
  { label: 'Décès d’un proche parent', value: 63 },
  { label: 'Maladies ou blessures personnelles', value: 53 },
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
  const totalScore = selectedEvents.value.reduce((acc, val) => acc + val, 0)

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
