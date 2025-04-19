<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-md" style="max-width: 600px; width: 100%">
      <q-card-section>
        <div class="text-h5">Votre Résultat</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-mt-md">
        <div class="text-h6">Score total : {{ score }}</div>

        <div class="q-mt-md">
          <q-banner rounded dense class="bg-primary text-white">
            {{ resultatTexte }}
          </q-banner>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-mt-md">
        <q-btn label="Revenir à l'accueil" color="primary" @click="goHome" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Récupération des données passées en query
const resultatTexte = route.query.text || 'Aucun résultat disponible.'
const score = route.query.score || 0

function goHome() {
  router.push('/')
}
</script>
