<script setup lang="ts">
import { signOut } from 'firebase/auth';
import { PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';

const currentUser = useCurrentUser();
const auth = useFirebaseAuth();
const isAdmin = computed(() => currentUser.value?.email === 'ivanlobanov97@gmail.com')

const beers = ref([
  {
    id: 1,
    name: 'Pilsner Urquell',
    description: 'Классическое чешское пиво с мягким вкусом',
    price: 250,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    name: 'Guinness',
    description: 'Тёмное ирландское пиво с кремовой пеной',
    price: 300,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ca7d9c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
])

const handleSignOut = () => {
  signOut(auth);
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Пивная витрина</h1>
        <div class="flex items-center gap-4">
          <UButton
            v-if="isAdmin"
            color="primary"
            to="/admin/create"
            class="shadow-md hover:shadow-lg transition-shadow"
          >
            <PlusIcon class="w-5 h-5 mr-2" />
            Добавить пиво
          </UButton>
          <UButton
            @click="handleSignOut"
            color="gray"
            variant="ghost"
            class="hover:bg-gray-100"
          >
            <ArrowRightOnRectangleIcon class="w-5 h-5 mr-2" />
            Выйти
          </UButton>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="beer in beers"
          :key="beer.id"
          class="hover:shadow-lg transition-shadow"
        >
          <template #header>
            <div class="relative h-48 overflow-hidden rounded-t-lg">
              <img
                :src="beer.image"
                :alt="beer.name"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </template>

          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900">{{ beer.name }}</h2>
            <p class="text-gray-600 line-clamp-2">{{ beer.description }}</p>
            <div class="flex justify-between items-center pt-2">
              <span class="text-lg font-bold text-primary-600">{{ beer.price }} ₽</span>
              <UBadge
                :color="beer.stock > 0 ? 'green' : 'red'"
                variant="subtle"
              >
                {{ beer.stock > 0 ? 'В наличии' : 'Нет в наличии' }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>