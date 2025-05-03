<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ isRegisterMode ? 'Créer un compte' : 'Connexion' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="Email"
            type="email"
            data-cy="login-email"
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="password"
            label="Mot de passe"
            type="password"
            data-cy="login-password"
            class="q-mb-md"
          />
        </q-card-section>

        <q-card-actions align="around">
          <q-btn
            :label="isRegisterMode ? 'S\'inscrire' : 'Se connecter'"
            color="primary"
            data-cy="login-validation"
            @click="isRegisterMode ? fakeRegister() : fakeLogin()"
          />
        </q-card-actions>

        <q-card-section class="text-center">
          <q-btn
            flat
            color="primary"
            :label="
              isRegisterMode ? 'Déjà inscrit ? Se connecter' : 'Pas de compte ? Créer un compte'
            "
            @click="isRegisterMode = !isRegisterMode"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth' // Importe le store

// Simulation JSON de "base de données" locale
const fakeUsers = ref([
  { email: 'admin@cesizen.fr', password: 'admin123' },
  { email: 'test@cesizen.fr', password: 'test123' },
])

const email = ref('')
const password = ref('')
const isRegisterMode = ref(false)
const router = useRouter()
const authStore = useAuthStore() // Utilise le store

async function fakeLogin() {
  if (!email.value || !password.value) {
    alert('Veuillez remplir tous les champs.')
    return
  }

  // Simulation d'un appel API
  const user = fakeUsers.value.find((u) => u.email === email.value && u.password === password.value)

  if (user) {
    authStore.login(user) // Utilise l'action du store pour la connexion
    router.push('/dashboard')
  } else {
    alert('Email ou mot de passe incorrect.')
  }
}

async function fakeRegister() {
  if (!email.value || !password.value) {
    alert('Veuillez remplir tous les champs.')
    return
  }

  const userExists = fakeUsers.value.find((u) => u.email === email.value)

  if (userExists) {
    alert('Un compte avec cet email existe déjà.')
    return
  }

  fakeUsers.value.push({ email: email.value, password: password.value })
  alert('Compte créé ! Vous pouvez maintenant vous connecter.')
  isRegisterMode.value = false
}
</script>
