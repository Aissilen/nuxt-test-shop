<script setup lang="ts">

const user = useCurrentUser();
const router = useRouter();

onMounted(() => {
  watch(user, (currentUser, prevUser) => {
    if (prevUser && !currentUser) {
      return router.replace('/login');
    }
  });
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
