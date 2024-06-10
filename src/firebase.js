import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5QbLs2zQoIebMZIHiYDoLPOnX9LGffec",
  authDomain: "book-shop-db-79653.firebaseapp.com",
  projectId: "book-shop-db-79653",
  storageBucket: "book-shop-db-79653.appspot.com",
  messagingSenderId: "565686525769",
  appId: "1:565686525769:web:8dc0bad31ece1b5f3b0498"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
