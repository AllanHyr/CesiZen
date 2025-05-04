import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    users: [
      { id: 1, email: 'admin@cesizen.fr', password: 'admin123', role: 1 }, // Rôle 1 pour admin
      { id: 2, email: 'test@cesizen.fr', password: 'test123', role: 2 }, // Rôle 2 pour utilisateur normal
    ],
  }),
  getters: {
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === 1, // Utilisation de 'role' pour plus de clarté
    isLoggedInGetter: (state) => state.isLoggedIn, // Getter explicite pour isLoggedIn
  },
  actions: {
    setUser(userData) {
      this.user = userData
      localStorage.setItem('currentUser', JSON.stringify(userData))
    },
    setLoggedIn(value) {
      this.isLoggedIn = value
      localStorage.setItem('isLoggedIn', value.toString())
    },
    login(userData) {
      this.setLoggedIn(true)
      this.setUser(userData)
    },
    logout() {
      this.setLoggedIn(false)
      this.setUser(null)
    },
    findUser(email, password) {
      return this.users.find((u) => u.email === email && u.password === password)
    },
    registerUser(newUser) {
      this.users.push(newUser)
      // Dans une application réelle, l'enregistrement impliquerait un appel API
    },
  },
})
