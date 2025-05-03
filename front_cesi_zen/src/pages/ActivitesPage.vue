<template>
  <q-page class="q-pa-md flex flex-center">
    <div v-if="isLoading" class="flex flex-center">
      <q-spinner size="50px" color="primary" />
    </div>

    <transition name="fade-slide" appear v-else>
      <div style="max-width: 800px; width: 100%">
        <q-card class="q-pa-md">
          <!-- Titre + Recherche -->
          <q-card-section>
            <div class="text-h5">Activités de détente</div>
            <div class="text-subtitle2 q-mt-sm q-mb-md">
              Découvrez et enregistrez vos activités préférées
            </div>

            <q-input
              outlined
              dense
              v-model="search"
              placeholder="Rechercher une activité..."
              debounce="300"
              clearable
              class="q-mb-md"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-card-section>

          <q-separator class="q-my-md" />

          <!-- Liste des activités filtrées -->
          <q-card-section>
            <q-list bordered separator>
              <q-item
                v-for="(activite, index) in filteredActivites"
                :key="index"
                clickable
                @click="goToActivite(activite.id)"
              >
                <q-item-section>
                  <q-item-label>
                    {{ activite.titre }}
                    <q-badge
                      v-if="activite.isFavori && isLoggedIn"
                      color="red"
                      class="q-ml-sm"
                      label="Favori"
                    />
                  </q-item-label>
                </q-item-section>

                <q-item-section side v-if="isLoggedIn">
                  <q-btn
                    dense
                    round
                    :icon="activite.isFavori ? 'favorite' : 'favorite_border'"
                    :color="activite.isFavori ? 'red' : 'grey'"
                    @click.stop="toggleFavori(activite)"
                  />
                </q-item-section>
              </q-item>

              <q-item v-if="filteredActivites.length === 0">
                <q-item-section>
                  <q-item-label>Aucune activité trouvée...</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'

const router = useRouter()
const auth = useAuthStore()

const search = ref('')
const isLoading = ref(true)

const isLoggedIn = computed(() => auth.isLoggedIn)

// Données simulées
const activites = ref([
  { id: 1, titre: 'Méditation guidée', isFavori: true },
  { id: 2, titre: 'Balade en forêt', isFavori: true },
  { id: 3, titre: 'Atelier de peinture', isFavori: false },
  { id: 4, titre: 'Exercice de respiration', isFavori: false },
  { id: 5, titre: 'Lecture relaxante', isFavori: false },
  { id: 6, titre: 'Cours de yoga', isFavori: false },
])

// Computed pour filtrer selon recherche
const filteredActivites = computed(() => {
  if (!search.value) return activites.value
  return activites.value.filter((a) => a.titre.toLowerCase().includes(search.value.toLowerCase()))
})

// Navigation au détail d'une activité
function goToActivite(id) {
  router.push(`/activites/${id}`)
}

// Gérer les favoris
function toggleFavori(activite) {
  activite.isFavori = !activite.isFavori
}

// Simuler un petit chargement
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
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
