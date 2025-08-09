import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'nextjs-firestore-db-df0dc.firebaseapp.com',
  projectId: 'nextjs-firestore-db-df0dc',
  storageBucket: 'nextjs-firestore-db-df0dc.firebasestorage.app',
  messagingSenderId: '779927272224',
  appId: '1:779927272224:web:bf507cd86c39d811fbf545',
}

// Ensure Firebase isn't initialized multiple times
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)
