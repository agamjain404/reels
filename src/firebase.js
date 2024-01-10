// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_Rue33AaoRRP88gTawiDYHymm31-qJlg",
    authDomain: "reels-9b04e.firebaseapp.com",
    projectId: "reels-9b04e",
    storageBucket: "reels-9b04e.appspot.com",
    messagingSenderId: "537846423205",
    appId: "1:537846423205:web:a01da5f127cbbcc5d7374c"
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// Exporting auth to get the methods of authentication
// To create firebase email authentication we need to enable email authentication
export const auth = firebase.auth();  

// Need to create firestore database inside the particular web app in firebase
const firestore = firebase.firestore();

// Exported database with created collections from firestore
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();