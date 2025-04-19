import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userEmail: JSON.parse(localStorage.getItem('currentUser'))?.email || '',
  }),
  actions: {
    login(userData) {
      this.isLoggedIn = true
      this.userEmail = userData.email
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify(userData))
    },
    logout() {
      this.isLoggedIn = false
      this.userEmail = ''
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('currentUser')
    },
  },
})
