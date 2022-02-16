//staging environment
//To Build project
//ng build --configuration=staging 
//To run project
//ng serve --configuration=staging


export const environment = {
    production: false,
    api_url: `https://api.staging.buildpass.baguio.gov.ph/api`,
  
    firebase: {
      apiKey: "AIzaSyCTCQAnOkASHslp8No3KbiiPuwMaJPixjM",
      authDomain: "ocpas-staging.firebaseapp.com",
      projectId: "ocpas-staging",
      storageBucket: "ocpas-staging.appspot.com",
      messagingSenderId: "707588667518",
      appId: "1:707588667518:web:fe86b240301f7700b1802f",
      measurementId: "G-39X06XCXLX"
    },
    mapbox: {
      accessToken:
        'pk.eyJ1IjoidGhvcnJlbWllbmRvIiwiYSI6ImNraGs1MnF4MDFsZG4yeW53M3U3ZjJ4ZTMifQ.a5GU9EWk45shfNxhK07G-w',
    },
    adobe_key: '3ff0dea6d3f6421b98eb54c89d3c274a',
    pusher: {
      key: '5aaab0a1fdf76144a6ff',
      cluster: 'ap1',
    },
    weekend: false,
    receiveApplications: true,

    version: "2.5.6"
  };
  
  