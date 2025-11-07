import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDQd4LayJcSj7gj47bVvSD1CpBQNGzX6BA",
  authDomain: "proyecto-integrador-7a6fb.firebaseapp.com",
  projectId: "proyecto-integrador-7a6fb",
  storageBucket: "proyecto-integrador-7a6fb.firebasestorage.app",
  messagingSenderId: "930496816309",
  appId: "1:930496816309:web:6b20d15f2834b20acccafc"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
