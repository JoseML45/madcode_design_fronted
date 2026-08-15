export const environment = {
  production: true,
  apiUrl: 'https://api.yourproject.com/api',
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY_PROD'] || '',
    authDomain: 'your-project-prod.firebaseapp.com',
    projectId: process.env['FIREBASE_PROJECT_ID_PROD'] || '',
    storageBucket: 'your-project-prod.appspot.com',
    messagingSenderId: process.env['FIREBASE_SENDER_ID_PROD'] || '',
    appId: process.env['FIREBASE_APP_ID_PROD'] || ''
  },
  logging: {
    enabled: false,
    level: 'error'
  },
  sentry: {
    dsn: process.env['SENTRY_DSN_PROD'] || ''
  },
  analytics: {
    enabled: true,
    trackingId: process.env['GOOGLE_ANALYTICS_ID'] || ''
  }
};
