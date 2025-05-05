<template>
  <q-page class="flex flex-center bg-grey-2">
    <div class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-card bordered>
        <q-card-section class="bg-primary text-white q-py-md">
          <div class="text-h5 text-center">
            {{ isRegisterMode ? 'Créer un compte' : 'Connexion' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input filled v-model="email" label="Email" type="email" data-cy="login-email" />
          <q-input
            filled
            v-model="password"
            label="Mot de passe"
            type="password"
            data-cy="login-password"
          />
          <q-checkbox
            v-if="isRegisterMode"
            v-model="isAdminRegistration"
            label="Créer un compte administrateur (développement)"
            class="q-mt-sm"
          />
        </q-card-section>

        <q-card-actions align="around" class="q-pa-md">
          <q-btn
            :label="isRegisterMode ? 'S\'inscrire' : 'Se connecter'"
            color="primary"
            data-cy="login-validation"
            @click="isRegisterMode ? register() : login()"
            :loading="loading"
            class="full-width"
          />
        </q-card-actions>

        <q-card-section class="text-center q-pa-sm">
          <q-btn
            flat
            color="grey-7"
            :label="
              isRegisterMode ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? Créer un compte'
            "
            @click="toggleRegisterMode"
            size="sm"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'

const email = ref('')
const password = ref('')
const isRegisterMode = ref(false)
const isAdminRegistration = ref(false) // Pour l'option (de développement) d'administrateur à l'inscription
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

function toggleRegisterMode() {
  isRegisterMode.value = !isRegisterMode.value
  // Réinitialiser le champ admin lors du changement de mode
  isAdminRegistration.value = false
}

async function login() {
  if (!email.value || !password.value) {
    $q.notify({
      type: 'warning',
      message: 'Veuillez remplir tous les champs.',
      position: 'top-right',
    })
    return
  }

  loading.value = true
  const user = authStore.findUser(email.value, password.value)

  setTimeout(() => {
    // Simulation d'un délai d'authentification
    loading.value = false
    if (user) {
      authStore.login(user)
      router.push('/dashboard') // Redirigez vers le dashboard après la connexion
      $q.notify({
        type: 'positive',
        message: 'Connexion réussie !',
        position: 'top-right',
      })
    } else {
      $q.notify({
        type: 'negative',
        message: 'Email ou mot de passe incorrect.',
        position: 'top-right',
      })
    }
  }, 1000)
}

async function register() {
  if (!email.value || !password.value) {
    $q.notify({
      type: 'warning',
      message: 'Veuillez remplir tous les champs.',
      position: 'top-right',
    })
    return
  }

  const userExists = authStore.users.find((u) => u.email === email.value)
  if (userExists) {
    $q.notify({
      type: 'warning',
      message: 'Un compte avec cet email existe déjà.',
      position: 'top-right',
    })
    return
  }

  loading.value = true

  const newUser = {
    id: Date.now(),
    email: email.value,
    password: password.value,
    role: isAdminRegistration.value ? 1 : 2,
  }

  authStore.registerUser(newUser)
  authStore.login(newUser) // Connexion directe

  loading.value = false

  $q.notify({
    type: 'positive',
    message: 'Compte créé et connecté avec succès !',
    position: 'top-right',
  })

  router.push('/dashboard') // Redirection vers le dashboard
}
</script>

<style scoped>
/* Styles spécifiques au composant si nécessaire */
</style>
