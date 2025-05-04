import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResultStore = defineStore('resultStore', () => {
  const resultats = ref([
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
  ])

  function getResultByScore(score) {
    return resultats.value.find((r) => score >= r.min_value && score <= r.max_value)
  }

  return { resultats, getResultByScore }
})
