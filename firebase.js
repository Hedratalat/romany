// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDn3Y3pF8-PriB_-LTdwpuuOkZVtZ9p_0",
  authDomain: "romany-mamdouh.firebaseapp.com",
  projectId: "romany-mamdouh",
  storageBucket: "romany-mamdouh.firebasestorage.app",
  messagingSenderId: "1095518457697",
  appId: "1:1095518457697:web:89630c564c469450b83f20",
  measurementId: "G-Z2ENTQDEH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;
