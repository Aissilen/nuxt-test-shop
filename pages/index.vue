<script setup lang="ts">
import { signOut } from 'firebase/auth';

const auth = useFirebaseAuth();

const handleSignOut = () => {
  signOut(auth);
}
</script>

<template>
  <div>
    Index page.
  </div>
  <button @click="handleSignOut">
    Sign out
  </button>
</template>

<style scoped>

</style>