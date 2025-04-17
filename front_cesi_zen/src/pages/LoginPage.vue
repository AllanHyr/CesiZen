<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px; width: 100%;">
      <q-card>
        <q-card-section>
          <div class="text-h6">Connexion</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="email" label="Email" type="email" class="q-mb-md" />
          <q-input filled v-model="password" label="Mot de passe" type="password" class="q-mb-md" />
        </q-card-section>

        <q-card-actions align="around">
          <q-btn label="Se connecter" color="primary" @click="login" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

function login() {
  if (email.value && password.value) {
    // Simuler une connexion réussie
    localStorage.setItem('isLoggedIn', 'true')
    router.push('/dashboard')
  } else {
    alert('Veuillez remplir les champs.')
  }
}
</script>
