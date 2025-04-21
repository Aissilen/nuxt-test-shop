<template>
  <div class="container mx-auto px-4 py-8">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">Добавить новое пиво</h1>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <UFormGroup label="Название">
          <UInput v-model="form.name" placeholder="Введите название пива" />
        </UFormGroup>

        <UFormGroup label="Описание">
          <UTextarea
            v-model="form.description"
            placeholder="Введите описание пива"
            :rows="3"
          />
        </UFormGroup>

        <UFormGroup label="Цена">
          <UInput
            v-model.number="form.price"
            type="number"
            placeholder="Введите цену"
          />
        </UFormGroup>

        <UFormGroup label="Количество">
          <UInput
            v-model.number="form.stock"
            type="number"
            placeholder="Введите количество"
          />
        </UFormGroup>

        <UFormGroup label="Изображение">
          <UInput
            v-model="form.image"
            placeholder="Введите URL изображения"
          />
        </UFormGroup>

        <div class="flex justify-end">
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
          >
            Добавить пиво
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// const { currentUser } = useFirebaseAuth()
const router = useRouter()
const loading = ref(false)

// Проверка на админа
// const isAdmin = computed(() => currentUser.value?.email === 'admin@example.com') // Замените на ваш email админа

// Если не админ, перенаправляем на главную
// if (!isAdmin.value) {
//   router.push('/')
// }

const form = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  image: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    // TODO: Добавить логику сохранения в Firebase
    console.log('Добавляем пиво:', form.value)
    await router.push('/')
  } catch (error) {
    console.error('Ошибка при добавлении пива:', error)
  } finally {
    loading.value = false
  }
}
</script> 