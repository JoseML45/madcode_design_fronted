# CI/CD Configuration Guide

## Overview

Este proyecto utiliza **GitHub Actions** para CI/CD con despliegue automático a **Firebase Hosting**. Hay tres ambientes:

- **Development** (branch: `develop`) → `your-project-dev.web.app`
- **Staging** (branch: `staging`) → `your-project-staging.web.app`
- **Production** (branch: `main`) → `yourproject.com`

---

## 📋 Pipeline Stages

### Development Pipeline
```
Push to develop
  ↓
1. Lint
2. Test
3. Build (Development env)
4. Minify & Obfuscate
5. Deploy to Firebase Dev
```

### Staging Pipeline
```
Push to staging
  ↓
1. Lint
2. Unit Tests
3. E2E Tests
4. Security Audit
5. Build (Staging env)
6. Minify HTML/CSS
7. Obfuscate JavaScript
8. Deploy to Firebase Staging
9. Notify Slack
```

### Production Pipeline
```
Push to main
  ↓
1. Security Checks (Trivy)
2. Lint (strict)
3. Unit Tests + Coverage
4. E2E Tests
5. Security Audit
6. SAST (SonarQube)
7. Build (Production env)
8. Aggressive Minification
9. Deploy to Firebase Prod
10. Verify Deployment
11. Create Release
12. Notify Slack
```

---

## 🔐 GitHub Secrets Setup

Ve a: `Settings → Secrets and variables → Actions`

### Development Secrets

```
FIREBASE_SERVICE_ACCOUNT_DEV         # JSON key from Firebase
FIREBASE_API_KEY_DEV                 # From Firebase Console
FIREBASE_PROJECT_ID_DEV              # your-project-dev
```

### Staging Secrets

```
FIREBASE_SERVICE_ACCOUNT_STAGING     # JSON key
FIREBASE_API_KEY_STAGING             # From Firebase
FIREBASE_PROJECT_ID_STAGING          # your-project-staging
FIREBASE_SENDER_ID_STAGING           # From Firebase
FIREBASE_APP_ID_STAGING              # From Firebase
SENTRY_DSN_STAGING                   # Sentry error tracking
SLACK_WEBHOOK_URL                    # Slack notifications
```

### Production Secrets

```
FIREBASE_SERVICE_ACCOUNT_PROD        # JSON key
FIREBASE_API_KEY_PROD                # From Firebase
FIREBASE_PROJECT_ID_PROD             # your-project-prod
FIREBASE_SENDER_ID_PROD              # From Firebase
FIREBASE_APP_ID_PROD                 # From Firebase
SENTRY_DSN_PROD                      # Sentry error tracking
GOOGLE_ANALYTICS_ID                  # GA tracking
SLACK_WEBHOOK_URL                    # Slack notifications
SONAR_HOST_URL                       # SonarQube URL (opcional)
SONAR_TOKEN                          # SonarQube token (opcional)
```

---

## 📱 How to Get Firebase Service Account

1. Ve a **Firebase Console**
2. Haz clic en ⚙️ (Settings) → **Project Settings**
3. Ve a la pestaña **Service Accounts**
4. Haz clic en **Generate New Private Key**
5. Copia todo el JSON y pégalo en `FIREBASE_SERVICE_ACCOUNT_*`

---

## 🛠️ Local Setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Configure Firebase Projects

```bash
# Selecciona el proyecto de desarrollo
firebase use --add your-project-dev

# Selecciona el proyecto de staging
firebase use --add your-project-staging

# Selecciona el proyecto de producción
firebase use --add your-project-prod
```

### 3. Deploy Locally (Manual)

```bash
# Development
npm run build:dev
firebase use development
firebase deploy

# Staging
npm run build:staging
firebase use staging
firebase deploy

# Production
npm run build:prod
firebase use production
firebase deploy
```

---

## 📦 Optimization Strategies

### Obfuscation (Ofuscación)
```typescript
// Terser (JavaScript minifier con obfuscación)
npx terser input.js --compress --mangle --output output.js
```

**What it does:**
- Minifies code
- Renames variables (a → x, myFunction → f)
- Removes dead code
- Reduces bundle size ~40-50%

### Minification (Minimización)
```typescript
// CSS
npx csso input.css -o output.css

// HTML
npx html-minifier --remove-comments --collapse-whitespace index.html -o index.min.html
```

### Bundle Analysis
```bash
npm run build:prod
npm run analyze
```

---

## 📊 Environment Variables

### Development (`environment.ts`)
```typescript
apiUrl: 'http://localhost:3000/api'
logging.enabled: true
```

### Staging (`environment.staging.ts`)
```typescript
apiUrl: 'https://staging-api.yourproject.com/api'
logging.enabled: true
```

### Production (`environment.prod.ts`)
```typescript
apiUrl: 'https://api.yourproject.com/api'
logging.enabled: false
sentry.dsn: (enabled for error tracking)
analytics.enabled: true
```

---

## 🔍 Testing

### Run Tests Locally
```bash
# Unit tests
npm run test

# CI mode (no watch)
npm run test:ci

# E2E tests
npm run e2e:ci

# With coverage
ng test --code-coverage
```

### Coverage Reports
Los reportes se generan en:
```
coverage/
```

---

## 📢 Slack Notifications

Para recibir notificaciones en Slack:

1. Crea un **Incoming Webhook** en Slack
2. Ve a tu workspace → Settings → Apps & integrations
3. Busca **Incoming Webhooks**
4. Copia la URL del webhook
5. Agrégalo como `SLACK_WEBHOOK_URL` secret en GitHub

---

## 🚨 Troubleshooting

### Build fails locally but works in CI
```bash
# Limpia cache
rm -rf node_modules dist .angular
npm install
npm run build:prod
```

### Firebase auth issues
```bash
firebase logout
firebase login
firebase use
```

### Secrets not working
1. Verifica que el nombre exacto coincida
2. Revisa que esté en la rama correcta
3. Re-ejecuta el workflow manualmente

---

## 📈 Best Practices

✅ **Do:**
- Push to `develop` for testing
- Use `staging` for pre-production testing
- Only merge to `main` when ready for production
- Keep secrets in GitHub, never in code
- Use environment files for configuration

❌ **Don't:**
- Commit secrets or API keys
- Push directly to `main`
- Use production secrets in development
- Disable security checks
- Ignore failing tests

---

## 🔄 CI/CD Workflow

### New Feature
```
1. Create feature branch from develop
2. Commit and push
3. GitHub Actions runs (dev pipeline)
4. Tests pass? → Create PR to develop
5. Code review + merge
6. Auto-deploy to dev environment
```

### Release to Staging
```
1. Merge develop → staging
2. GitHub Actions runs (staging pipeline)
3. E2E tests + security audit
4. Auto-deploy to staging
5. Manual testing
```

### Release to Production
```
1. Merge staging → main
2. GitHub Actions runs (production pipeline)
3. All tests + SAST scan
4. Auto-deploy to production
5. Verify health checks
6. GitHub release created
7. Slack notification sent
```

---

## 📞 Support

Para más info:
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Angular Build Docs](https://angular.io/cli/build)

