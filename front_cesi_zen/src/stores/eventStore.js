import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventStore = defineStore('eventStore', () => {
  const events = ref([
    { id: 1, label: 'Décès du conjoint', value: 100 },
    { id: 2, label: 'Divorce', value: 73 },
    { id: 3, label: 'Séparation', value: 65 },
    // Ajoute ici les autres événements de base
  ])

  function addEvent(event) {
    event.id = Date.now()
    events.value.push(event)
  }

  function deleteEvent(id) {
    events.value = events.value.filter((e) => e.id !== id)
  }

  function updateEvent(updatedEvent) {
    const index = events.value.findIndex((e) => e.id === updatedEvent.id)
    if (index !== -1) {
      events.value[index] = { ...updatedEvent }
    }
  }

  return {
    events,
    addEvent,
    deleteEvent,
    updateEvent,
  }
})
