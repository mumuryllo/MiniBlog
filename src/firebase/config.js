import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBcD6x_TAYzuDot2V02Oy7bNQiIy3IIu34",
  authDomain: "miniblog-233aa.firebaseapp.com",
  projectId: "miniblog-233aa",
  storageBucket: "miniblog-233aa.appspot.com",
  messagingSenderId: "22928258612",
  appId: "1:22928258612:web:0690aea6fe77b990f6bc61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app)

export {db};