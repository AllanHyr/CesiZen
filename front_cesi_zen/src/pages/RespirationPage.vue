<template>
  <q-page class="q-pa-md flex flex-center">
    <div style="max-width: 600px; width: 100%">
      <q-card>
        <q-card-section>
          <div class="text-h5">Exercice de Respiration - Cohérence Cardiaque</div>
          <div class="text-caption q-mt-sm">Sélectionnez un exercice ou créez le vôtre.</div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="selectedPreset"
            :options="presets"
            label="Choisissez un exercice"
            emit-value
            map-options
            class="q-mb-md"
          />

          <div v-if="selectedPreset === 'custom'" class="q-gutter-md">
            <q-input
              filled
              v-model.number="customInspiration"
              label="Inspiration (secondes)"
              type="number"
            />
            <q-input filled v-model.number="customApnee" label="Apnée (secondes)" type="number" />
            <q-input
              filled
              v-model.number="customExpiration"
              label="Expiration (secondes)"
              type="number"
            />
          </div>

          <q-btn
            label="Démarrer"
            color="primary"
            class="q-mt-md full-width"
            @click="startBreathing"
          />
        </q-card-section>

        <q-separator />

        <q-card-section v-if="started">
          <div class="text-h6 text-center">{{ phase }}</div>
          <div class="text-h4 text-center q-mt-md">{{ timer }}s</div>
          <q-btn
            label="Arrêter"
            color="negative"
            class="q-mt-md full-width"
            @click="stopBreathing"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { getBreathingSet, getBreathingPhases } from 'src/utils/breathing'

const selectedPreset = ref(null)
const started = ref(false)
const timer = ref(0)
const phase = ref('')

const customInspiration = ref(4)
const customApnee = ref(0)
const customExpiration = ref(6)

let interval = null

const presets = [
  { label: 'Exercice 748 (7-4-8)', value: '748' },
  { label: 'Exercice 55 (5-0-5)', value: '55' },
  { label: 'Exercice 46 (4-0-6)', value: '46' },
  { label: 'Personnalisé', value: 'custom' },
]

function startBreathing() {
  started.value = true
  cycleBreathing()
}

function stopBreathing() {
  started.value = false
  clearInterval(interval)
  phase.value = ''
  timer.value = 0
}

function cycleBreathing() {
  const breathingSet = getBreathingSet(selectedPreset.value, {
    inspiration: customInspiration.value,
    apnee: customApnee.value,
    expiration: customExpiration.value,
  })

  const phases = getBreathingPhases(breathingSet)

  let currentPhase = 0

  function nextPhase() {
    if (!started.value) return

    phase.value = phases[currentPhase].name
    timer.value = phases[currentPhase].duration

    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--
      } else {
        clearInterval(interval)
        currentPhase = (currentPhase + 1) % phases.length
        nextPhase()
      }
    }, 1000)
  }

  nextPhase()
}
</script>
