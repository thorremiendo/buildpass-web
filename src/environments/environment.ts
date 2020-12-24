// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    // api_url: `http://ocpas-api.test/api`,
   api_url: `http://localhost:8000/api`,
  firebase: {    
    apiKey: "AIzaSyA2KX_f0SKSYcJhqdDGdBK5yfnlxYYWuHU",
    authDomain: "baguio-ocpas.firebaseapp.com",
    databaseURL: "https://baguio-ocpas.firebaseio.com",
    projectId: "baguio-ocpas",
    storageBucket: "baguio-ocpas.appspot.com",
    messagingSenderId: "555420675385",
    appId: "1:555420675385:web:9c6c47107f6b9695fa8ce8",
    measurementId: "G-CC0KM4S06Z"
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoidGhvcnJlbWllbmRvIiwiYSI6ImNraGs1MnF4MDFsZG4yeW53M3U3ZjJ4ZTMifQ.a5GU9EWk45shfNxhK07G-w'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
