import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useState } from '#app'

export function useFirebase() {
  const config = useRuntimeConfig().public

  const firebaseConfig = {
    apiKey: config.firebaseApiKey as string,
    authDomain: config.firebaseAuthDomain as string,
    projectId: config.firebaseProjectId as string,
    storageBucket: config.firebaseStorageBucket as string,
    messagingSenderId: config.firebaseMessagingSenderId as string,
    appId: config.firebaseAppId as string,
    measurementId: config.firebaseMeasurementId as string
  }
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  
  // Get Firestore and Auth instances
  const db = getFirestore(app)
  const auth = getAuth(app)
  
  return {
    app,
    db,
    auth
  }
} 