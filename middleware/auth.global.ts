import { onAuthStateChanged } from 'firebase/auth'
import { useFirebase } from '~/composables/useFirebase'

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) {
    return // Пропускаем middleware на сервере
  }

  const { auth } = useFirebase()
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      console.log('Middleware: User:', user) // Для отладки

      if (user && to.name === 'login') {
        resolve(navigateTo('/'))
      } else if (!user && to.name !== 'login') {
        resolve(navigateTo('/login'))
      } else {
        resolve()
      }
    })
  })
})