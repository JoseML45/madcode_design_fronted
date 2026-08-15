export const environment = {
  production: false,
  apiUrl: 'https://staging-api.yourproject.com/api',
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY_STAGING'] || 'YOUR_STAGING_API_KEY',
    authDomain: 'your-project-staging.firebaseapp.com',
    projectId: process.env['FIREBASE_PROJECT_ID_STAGING'] || 'your-project-staging',
    storageBucket: 'your-project-staging.appspot.com',
    messagingSenderId: process.env['FIREBASE_SENDER_ID_STAGING'] || 'YOUR_STAGING_SENDER_ID',
    appId: process.env['FIREBASE_APP_ID_STAGING'] || 'YOUR_STAGING_APP_ID'
  },
  logging: {
    enabled: true,
    level: 'info'
  },
  sentry: {
    dsn: process.env['SENTRY_DSN_STAGING'] || ''
  }
};
