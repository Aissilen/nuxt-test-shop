<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";

const auth = useFirebaseAuth();
const authProvider = new GoogleAuthProvider();
const router = useRouter();

const loginWithGoogle = () => {
  signInWithPopup(auth, authProvider)
    .then(() => router.replace('/'));
};
</script>

<template>
  <div>
    Login page.
  </div>
  <button @click="loginWithGoogle">
    Login with google
  </button>
</template>

<style scoped>

</style>