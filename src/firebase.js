import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5QbLs2zQoIebMZIHiYDoLPOnX9LGffec",
  authDomain: "book-shop-db-79653.firebaseapp.com",
  projectId: "book-shop-db-79653",
  storageBucket: "book-shop-db-79653.appspot.com",
  messagingSenderId: "565686525769",
  appId: "1:565686525769:web:8dc0bad31ece1b5f3b0498"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, db, storage };
