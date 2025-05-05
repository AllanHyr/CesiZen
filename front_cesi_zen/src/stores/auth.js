import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    users: JSON.parse(localStorage.getItem('users')) || [
      { id: 1, email: 'admin@cesizen.fr', password: 'admin123', role: 1 },
      { id: 2, email: 'test@cesizen.fr', password: 'test123', role: 2 },
    ],
  }),

  getters: {
    currentUser: (state) => state.user,
    userEmail: (state) => state.user?.email || '',
    isAdmin: (state) => state.user?.role === 1,
    isLoggedInGetter: (state) => state.isLoggedIn,
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
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    loadUsersFromStorage() {
      const saved = localStorage.getItem('users')
      if (saved) {
        this.users = JSON.parse(saved)
      }
    },
  },
})
