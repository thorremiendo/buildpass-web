importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA2KX_f0SKSYcJhqdDGdBK5yfnlxYYWuHU",
    authDomain: "baguio-ocpas.firebaseapp.com",
    databaseURL: "https://baguio-ocpas.firebaseio.com",
    projectId: "baguio-ocpas",
    storageBucket: "baguio-ocpas.appspot.com",
    messagingSenderId: "555420675385",
    appId: "1:555420675385:web:9c6c47107f6b9695fa8ce8",
    measurementId: "G-CC0KM4S06Z"
});
const messaging = firebase.messaging();
