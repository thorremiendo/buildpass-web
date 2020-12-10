importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA2KX_f0SKSYcJhqdDGdBK5yfnlxYYWuHU",
    authDomain: "baguio-ocpas.firebaseapp.com",
    databaseURL: "https://baguio-ocpas.firebaseio.com",
    projectId: "baguio-ocpas",
    storageBucket: "baguio-ocpas.appspot.com",
    messagingSenderId: "555420675385",
    appId: "1:555420675385:web:e2622f3115b82c1cfa8ce8",
    measurementId: "G-CC58SB2Y8X"
});
const messaging = firebase.messaging();
