<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Добавить новое пиво</h2>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Название</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Описание</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Цена</label>
          <input
            id="price"
            v-model="form.price"
            type="number"
            step="0.01"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="image" class="block text-sm font-medium text-gray-700">URL изображения</label>
          <input
            id="image"
            v-model="form.image"
            type="url"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Добавить пиво
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const router = useRouter()
const db = useFirestore()
const form = ref({
  name: '',
  description: '',
  price: 0,
  image: ''
})

const handleSubmit = async () => {
  try {
    await addDoc(collection(db, 'beers'), {
      ...form.value,
      price: Number(form.value.price),
      createdAt: new Date()
    })
    router.push('/')
  } catch (error) {
    console.error('Error adding beer:', error)
  }
}
</script> 