import { ref, onMounted } from 'vue'
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { useFirebase } from './useFirebase'

export function useAuth() {
  const { auth } = useFirebase()
  const user = ref<User | null>(null)
  const isAdmin = ref(false)
  const isLoading = ref(true)

  // Инициализация состояния только на клиенте
  onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser) // Для отладки
      user.value = currentUser
      isAdmin.value = currentUser !== null // Убрали !!
      isLoading.value = false
    }, (error) => {
      console.error('Auth state error:', error)
      isLoading.value = false
    })
  })

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Sign in successful:', userCredential.user) // Для отладки
      return !!userCredential.user
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      if (process.client) {
        await navigateTo('/login')
      }
      return true
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return {
    user,
    isAdmin,
    isLoading,
    signIn,
    signOut
  }
}
