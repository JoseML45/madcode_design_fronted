// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    apiKey: 'YOUR_DEV_API_KEY',
    authDomain: 'your-project-dev.firebaseapp.com',
    projectId: 'your-project-dev',
    storageBucket: 'your-project-dev.appspot.com',
    messagingSenderId: 'YOUR_DEV_SENDER_ID',
    appId: 'YOUR_DEV_APP_ID'
  },
  logging: {
    enabled: true,
    level: 'debug'
  }
};
