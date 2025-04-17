<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px; width: 100%;">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ modeInscription ? 'Créer un compte' : 'Connexion' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="email" label="Email" type="email" class="q-mb-md" />
          <q-input filled v-model="password" label="Mot de passe" type="password" class="q-mb-md" />
        </q-card-section>

        <q-card-actions align="around">
          <q-btn
            :label="modeInscription ? 'Créer un compte' : 'Se connecter'"
            color="primary"
            @click="modeInscription ? register() : login()"
          />
        </q-card-actions>

        <q-card-section class="text-center">
          <q-btn
            flat
            color="primary"
            :label="modeInscription ? 'Déjà inscrit ? Se connecter' : 'Pas de compte ? Créer un compte'"
            @click="modeInscription = !modeInscription"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const modeInscription = ref(false) // false = login, true = inscription
const router = useRouter()

function login() {
  if (!email.value || !password.value) {
    alert('Veuillez remplir tous les champs.')
    return
  }

  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(u => u.email === email.value && u.password === password.value)

  if (user) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('currentUser', JSON.stringify(user))
    router.push('/dashboard')
  } else {
    alert('Identifiants invalides.')
  }
}

function register() {
  if (!email.value || !password.value) {
    alert('Veuillez remplir tous les champs.')
    return
  }

  const users = JSON.parse(localStorage.getItem('users')) || []
  const userExists = users.find(u => u.email === email.value)

  if (userExists) {
    alert('Un compte avec cet email existe déjà.')
    return
  }

  const newUser = {
    email: email.value,
    password: password.value
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.')
  modeInscription.value = false
}
</script>
