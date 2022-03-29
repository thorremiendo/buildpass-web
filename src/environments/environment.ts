// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api_url: `http://localhost:8000/api`,
  api_url: `https://api.staging.buildpass.baguio.gov.ph/api`,
  // api_url: `https://api.buildpass.baguio.gov.ph/api`,

  firebase: {
    apiKey: 'AIzaSyCTCQAnOkASHslp8No3KbiiPuwMaJPixjM',
    authDomain: 'ocpas-staging.firebaseapp.com',
    projectId: 'ocpas-staging',
    storageBucket: 'ocpas-staging.appspot.com',
    messagingSenderId: '707588667518',
    appId: '1:707588667518:web:fe86b240301f7700b1802f',
    measurementId: 'G-39X06XCXLX',
  },
  mapbox: {
    accessToken:
      'pk.eyJ1IjoidGhvcnJlbWllbmRvIiwiYSI6ImNraGs1MnF4MDFsZG4yeW53M3U3ZjJ4ZTMifQ.a5GU9EWk45shfNxhK07G-w',
  },
  adobe_key: '8c0cd670273d451cbc9b351b11d22318',
  pusher: {
    key: '5aaab0a1fdf76144a6ff',
    cluster: 'ap1',
  },
  weekend: false,
  receiveApplications: true,
  restrictCbao: false,
  version: '2.8.3',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
