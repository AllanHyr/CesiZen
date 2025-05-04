<template>
  <q-page class="q-pa-lg q-gutter-y-xl">
    <!-- 🧠 SECTION : ÉVÉNEMENTS -->
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Gestion des Événements</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="addEvent" class="q-gutter-md row items-center">
          <q-input
            v-model="newEvent.label"
            label="Nom de l'événement"
            filled
            class="col-12 col-md-5"
          />
          <q-input
            v-model.number="newEvent.value"
            label="Valeur"
            type="number"
            filled
            class="col-12 col-md-3"
          />
          <q-btn type="submit" label="Ajouter" color="primary" class="col-12 col-md-3" />
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-table
          :rows="events"
          :columns="eventColumns"
          row-key="id"
          flat
          bordered
          dense
          class="q-mt-md"
        >
          <template v-slot:body-cell-label="props">
            <q-td>
              <div v-if="editedEvent?.id === props.row.id">
                <q-input dense v-model="editedEvent.label" />
              </div>
              <div v-else>{{ props.row.label }}</div>
            </q-td>
          </template>

          <template v-slot:body-cell-value="props">
            <q-td>
              <div v-if="editedEvent?.id === props.row.id">
                <q-input dense type="number" v-model.number="editedEvent.value" />
              </div>
              <div v-else>{{ props.row.value }}</div>
            </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td class="text-right">
              <div v-if="editedEvent?.id === props.row.id">
                <q-btn icon="check" color="positive" flat round @click="saveEventEdit" />
                <q-btn icon="close" color="grey" flat round @click="cancelEventEdit" />
              </div>
              <div v-else>
                <q-btn icon="edit" color="primary" flat round @click="editEvent(props.row)" />
                <q-btn icon="delete" color="red" flat round @click="deleteEvent(props.row.id)" />
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- 📊 SECTION : RÉSULTATS -->
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Résultats du Diagnostic</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="addResult" class="q-gutter-md row items-center">
          <q-input v-model="newResult.text" label="Texte" filled class="col-12 col-md-6" />
          <q-input v-model.number="newResult.min_value" label="Min" filled class="col-6 col-md-2" />
          <q-input v-model.number="newResult.max_value" label="Max" filled class="col-6 col-md-2" />
          <q-btn type="submit" label="Ajouter" color="primary" class="col-12 col-md-2" />
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-table :rows="resultats" :columns="resultColumns" row-key="min_value" flat bordered dense>
          <template v-slot:body-cell-text="props">
            <q-td>
              <div v-if="editedResult?.min_value === props.row.min_value">
                <q-input dense v-model="editedResult.text" />
              </div>
              <div v-else>{{ props.row.text }}</div>
            </q-td>
          </template>

          <template v-slot:body-cell-min_value="props">
            <q-td>
              <div v-if="editedResult?.min_value === props.row.min_value">
                <q-input dense type="number" v-model.number="editedResult.min_value" />
              </div>
              <div v-else>{{ props.row.min_value }}</div>
            </q-td>
          </template>

          <template v-slot:body-cell-max_value="props">
            <q-td>
              <div v-if="editedResult?.min_value === props.row.min_value">
                <q-input dense type="number" v-model.number="editedResult.max_value" />
              </div>
              <div v-else>{{ props.row.max_value }}</div>
            </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td class="text-right">
              <div v-if="editedResult?.min_value === props.row.min_value">
                <q-btn icon="check" color="positive" flat round @click="saveResultEdit" />
                <q-btn icon="close" color="grey" flat round @click="cancelResultEdit" />
              </div>
              <div v-else>
                <q-btn icon="edit" color="primary" flat round @click="editResult(props.row)" />
                <q-btn
                  icon="delete"
                  color="red"
                  flat
                  round
                  @click="deleteResult(props.row.min_value)"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useEventStore } from 'src/stores/eventStore'
import { useResultStore } from 'src/stores/resultStore'
import { storeToRefs } from 'pinia'

/* === ÉVÉNEMENTS === */
const eventStore = useEventStore()
const { events } = storeToRefs(eventStore)
const newEvent = ref({ label: '', value: 0 })
const editedEvent = ref(null)

const eventColumns = [
  { name: 'label', label: 'Événement', field: 'label', align: 'left' },
  { name: 'value', label: 'Valeur', field: 'value', align: 'center' },
  { name: 'action', label: 'Action', field: 'action', align: 'right' },
]

function addEvent() {
  if (!newEvent.value.label || newEvent.value.value === null) return
  eventStore.addEvent({ ...newEvent.value })
  newEvent.value = { label: '', value: 0 }
}
function editEvent(event) {
  editedEvent.value = { ...event }
}
function saveEventEdit() {
  eventStore.updateEvent(editedEvent.value)
  editedEvent.value = null
}
function cancelEventEdit() {
  editedEvent.value = null
}
function deleteEvent(id) {
  eventStore.deleteEvent(id)
}

/* === RÉSULTATS === */
const resultStore = useResultStore()
const { resultats } = storeToRefs(resultStore)
const newResult = ref({ text: '', min_value: 0, max_value: 0 })
const editedResult = ref(null)

const resultColumns = [
  { name: 'text', label: 'Texte', field: 'text', align: 'left' },
  { name: 'min_value', label: 'Min', field: 'min_value', align: 'center' },
  { name: 'max_value', label: 'Max', field: 'max_value', align: 'center' },
  { name: 'action', label: 'Action', field: 'action', align: 'right' },
]

function addResult() {
  resultats.value.push({ ...newResult.value })
  newResult.value = { text: '', min_value: 0, max_value: 0 }
}
function editResult(result) {
  editedResult.value = { ...result }
}
function saveResultEdit() {
  const index = resultats.value.findIndex((r) => r.min_value === editedResult.value.min_value)
  if (index !== -1) resultats.value[index] = { ...editedResult.value }
  editedResult.value = null
}
function cancelResultEdit() {
  editedResult.value = null
}
function deleteResult(minVal) {
  resultats.value = resultats.value.filter((r) => r.min_value !== minVal)
}
</script>
