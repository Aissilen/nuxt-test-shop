<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'
import { PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useFirestore } from 'vuefire'

const router = useRouter()
const db = useFirestore()
const beers = ref([])
const loading = ref(true)
const isAdmin = ref(false)

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'beers'))
    beers.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      imageError: false
    }))
  } catch (error) {
    console.error('Error fetching beers:', error)
  } finally {
    loading.value = false
  }

  // Check if user is admin
  const auth = getAuth()
  const user = auth.currentUser
  if (user) {
    // Here you would typically check the user's role in your database
    // For now, we'll just set isAdmin to true for demonstration
    isAdmin.value = true
  }
})

const deleteBeer = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'beers', id))
    beers.value = beers.value.filter(beer => beer.id !== id)
  } catch (error) {
    console.error('Error deleting beer:', error)
  }
}

const handleSignOut = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-white">Витрина пива</h1>
        <div class="flex space-x-4">
          <UButton
            v-if="isAdmin"
            color="primary"
            variant="solid"
            @click="navigateTo('/add-beer')"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            Добавить пиво
          </UButton>
          <UButton
            color="gray"
            variant="ghost"
            @click="handleSignOut"
          >
            <ArrowRightOnRectangleIcon class="h-5 w-5 mr-2" />
            Выйти
          </UButton>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="beer in beers"
          :key="beer.id"
          class="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              v-if="!beer.imageError"
              :src="beer.image"
              :alt="beer.name"
              class="w-full h-full object-cover"
              @error="() => beer.imageError = true"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
              <span class="text-gray-400 text-lg">Нет изображения</span>
            </div>
          </div>
          <div class="p-6">
            <h2 class="text-xl font-semibold text-white mb-2">{{ beer.name }}</h2>
            <p class="text-gray-300 mb-4">{{ beer.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-indigo-400">{{ beer.price }} ₽</span>
              <UButton
                v-if="isAdmin"
                color="red"
                variant="ghost"
                @click="deleteBeer(beer.id)"
              >
                Удалить
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>