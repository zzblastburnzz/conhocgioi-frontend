import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCe4n9b9j8J8w09rqmqcgjIutptpQfmmJA",             // Thay bằng key thực tế từ Firebase Console
  authDomain: "conhocgioi-181e6.firebaseapp.com",
  projectId: "conhocgioi-181e6",
  storageBucket: "conhocgioi-181e6.firebasestorage.app",
  messagingSenderId: "321801054852",
  appId: "1:321801054852:web:5c2df2ae051e63b0acb0d1"
};

export const app = initializeApp(firebaseConfig);
