// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFHaG0TY08o42ZN-r6TbAehj7HBVLuwnM",
    authDomain: "blogoo-contenthub.firebaseapp.com",
    projectId: "blogoo-contenthub",
    storageBucket: "blogoo-contenthub.appspot.com",
    messagingSenderId: "89854950345",
    appId: "1:89854950345:web:051b2c4674894da3ba4618"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
