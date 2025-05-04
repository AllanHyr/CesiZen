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
            v-for="event in events"
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
import { useEventStore } from 'src/stores/eventStore'
import { useResultStore } from 'src/stores/resultStore'
import { storeToRefs } from 'pinia'
import { calculerScore } from 'src/utils/calculerScore'

const router = useRouter()

const eventStore = useEventStore()
const { events } = storeToRefs(eventStore)

const resultStore = useResultStore()

const selectedEvents = ref([])

function submitForm() {
  const totalScore = calculerScore(selectedEvents.value)
  const resultat = resultStore.getResultByScore(totalScore)

  if (resultat) {
    router.push({
      name: 'resultat-diagnostique',
      query: { text: resultat.text, score: totalScore },
    })
  } else {
    alert('Aucun résultat trouvé pour ce score.')
  }
}
</script>
