import { ref } from 'vue'
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  type DocumentData 
} from 'firebase/firestore'
import { useFirebase } from './useFirebase'

interface Beer {
  id: string
  name: string
  description: string
  price: number
  image: string
  createdAt: Date
  imageError?: boolean
}

export function useBeers() {
  const { db } = useFirebase()
  const beers = ref<Beer[]>([])
  const loading = ref(true)
  
  // Fetch all beers
  const fetchBeers = async () => {
    loading.value = true
    try {
      const querySnapshot = await getDocs(collection(db, 'beers'))
      beers.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        imageError: false
      })) as Beer[]
      return beers.value
    } catch (error) {
      console.error('Error fetching beers:', error)
      return [] as Beer[]
    } finally {
      loading.value = false
    }
  }
  
  // Add a new beer
  const addBeer = async (beerData: Omit<Beer, 'id' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'beers'), {
        ...beerData,
        price: Number(beerData.price),
        createdAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding beer:', error)
      return null
    }
  }
  
  // Delete a beer
  const deleteBeer = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'beers', id))
      beers.value = beers.value.filter(beer => beer.id !== id)
      return true
    } catch (error) {
      console.error('Error deleting beer:', error)
      return false
    }
  }

  return {
    beers,
    loading,
    fetchBeers,
    addBeer,
    deleteBeer
  }
} 