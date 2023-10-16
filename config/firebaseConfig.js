// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyDEMzXhSPafbJPabElyy8Lyva2yoiT2Vnc",
  authDomain: "amnilassignment.firebaseapp.com",
  projectId: "amnilassignment",
  storageBucket: "amnilassignment.appspot.com",
  messagingSenderId: "818104415325",
  appId: "1:818104415325:web:61982e53c3025fb27109b4",
  measurementId: "G-S3XKLT2T3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = { app };