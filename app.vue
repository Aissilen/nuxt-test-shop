<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const router = useRouter()

onMounted(() => {
  watch(user, (currentUser, prevUser) => {
    if (prevUser && !currentUser) {
      return router.replace('/login')
    }
  })
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
