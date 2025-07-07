// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7jyZdPRpNII6XaO1oklU6D0SigLD-7AA",
  authDomain: "quizz-parfum-soon.firebaseapp.com",
  projectId: "quizz-parfum-soon",
  storageBucket: "quizz-parfum-soon.firebasestorage.app",
  messagingSenderId: "319976974504",
  appId: "1:319976974504:web:af3a254d39b8c6279c3a9d",
  measurementId: "G-S6BN8MBNQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };