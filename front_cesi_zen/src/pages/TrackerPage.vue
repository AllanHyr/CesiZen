<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md" style="max-width: 600px; width: 100%">
      <q-card-section>
        <div class="text-h5">Tracker d'Émotions</div>
        <div class="text-subtitle2 q-mt-sm">
          Sélectionnez les émotions que vous ressentez aujourd'hui :
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="submitEmotions">
          <q-checkbox
            v-for="emotion in emotions"
            :key="emotion.id"
            v-model="selectedEmotions"
            :label="emotion.nom"
            :val="emotion.id"
            class="q-mb-sm"
          />

          <q-btn
            label="Enregistrer mes émotions"
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
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Simulation des données venant de l'API
const emotions = [
  { id: 1, nom: 'Fierté' },
  { id: 2, nom: 'Contentement' },
  { id: 3, nom: 'Anxiété' },
  { id: 4, nom: 'Déception' },
  { id: 5, nom: 'Excitation' },
  { id: 6, nom: 'Tristesse' },
]

const selectedEmotions = ref([])

function submitEmotions() {
  if (selectedEmotions.value.length === 0) {
    $q.notify({
      type: 'warning',
      message: 'Veuillez sélectionner au moins une émotion.',
      position: 'top-right',
    })
    return
  }

  // Ici tu pourrais envoyer selectedEmotions vers ton API !

  console.log('Émotions sélectionnées:', selectedEmotions.value)

  $q.notify({
    type: 'positive',
    message: 'Vos émotions ont été enregistrées avec succès !',
    position: 'top-right',
  })

  // Optionnel : redirection après enregistrement
  router.push('/dashboard')
}
</script>
