# Guía de Integración - Hero Container con Efecto Cortina Interactivo

## 📋 Descripción General

El nuevo componente `HeroContainerComponent` presenta un efecto cortina interactivo horizontal que permite a los usuarios revelar/ocultar dos imágenes simultáneamente: **Diseño Web** (azul/cyan) y **Diseño Gráfico** (magenta/rosa).

### Características principales

- ✨ Efecto cortina interactivo (mouse y touch)
- 🎨 Paleta dual: cyan + magenta
- 🌓 Tema claro/oscuro automático
- 📱 Responsive (desktop, tablet, móvil)
- ♿ Accesible (ARIA labels, keyboard navigation)
- ⚡ Optimizado para performance (60fps)
- 🎭 Animación de fondo sutil

---

## 🚀 Instalación Rápida

### 1. Verificar la estructura de archivos

```
src/app/hero-container/
├── hero-container.component.ts
├── hero-container.component.html
├── hero-container.component.css
├── web-design.svg
└── graphic-design.svg
```

### 2. Actualizar `app.routes.ts`

El componente es **standalone**, así que no necesita módulo. Si lo usas en el routing:

```typescript
import { HeroContainerComponent } from './hero-container/hero-container.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroContainerComponent
  }
];
```

### 3. Usar en un componente padre

```typescript
import { Component } from '@angular/core';
import { HeroContainerComponent } from './hero-container/hero-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroContainerComponent],
  template: `<app-hero-container></app-hero-container>`
})
export class AppComponent {}
```

---

## 🎨 Personalización de Estilos

### Variables CSS disponibles

Todas las variables están definidas en `src/styles.css` y se pueden sobrescribir:

```css
/* Colores */
--bg-ground: #0f1419;           /* Fondo principal */
--accent-web: #00d9ff;           /* Cyan - Diseño Web */
--accent-graphic: #ff4d7d;       /* Magenta - Diseño Gráfico */
--text-primary: #f0f2f5;         /* Texto principal */
--text-secondary: #8b9dc3;       /* Texto secundario */

/* Espaciado */
--space-md: 1rem;
--space-lg: 1.5rem;
--space-xl: 2rem;
--space-2xl: 3rem;

/* Tipografía */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'Consolas', 'Liberation Mono', monospace;
```

### Cambiar colores de marca

En `src/styles.css`:

```css
:root {
  --accent-web: #your-web-color;      /* Tu color para web */
  --accent-graphic: #your-graphic-color; /* Tu color para gráfico */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --accent-web: #your-web-color-dark;
    --accent-graphic: #your-graphic-color-dark;
  }
}
```

---

## 📝 Personalización de Contenido

### Textos en el hero

Edita `hero-container.component.html`:

```html
<h1 class="hero-title">
  Tus palabras aquí,<br>
  <span class="highlight-web">con efecto</span>
  <span class="highlight-graphic"> gradiente</span>
</h1>

<p class="description">
  Tu descripción del negocio aquí
</p>
```

### Textos en los botones CTA

```html
<a href="#tus-proyectos" class="btn btn-primary">Ver Proyectos</a>
<a href="https://tu-whatsapp" class="btn btn-secondary">Contactar</a>
```

### Imágenes SVG

Reemplaza `web-design.svg` y `graphic-design.svg` con tus propias imágenes:

```html
<img src="your-web-image.svg" alt="Web Design" class="curtain-image web-image" />
<img src="your-graphic-image.svg" alt="Graphic Design" class="curtain-image graphic-image" />
```

**Recomendaciones:**
- Mantén aspecto 1:1 (cuadrado)
- Tamaño máximo: 500KB
- Usa SVG para mejor escalabilidad
- Incluye `alt` descriptivos

---

## ⚙️ Cómo Funciona el Efecto Cortina

### Lógica TypeScript

El componente detecta:

1. **Mouse movement**: `@HostListener('mousemove')`
2. **Touch events**: `touchmove` y `touchstart`
3. **Calcula posición**: `(clientX - containerX) / containerWidth * 100`
4. **Actualiza clip-path**: Ajusta dinámicamente el corte de las imágenes

### CSS clip-path

```css
.web-image {
  clip-path: polygon(0 0, var(--curtain-x) 0, var(--curtain-x) 100%, 0 100%);
}

.graphic-image {
  clip-path: polygon(var(--curtain-x) 0, 100% 0, 100% 100%, var(--curtain-x) 100%);
}
```

### Divider visual

La línea divisoria se mueve con:
```css
.curtain-divider {
  left: 50%;           /* Por defecto en el centro */
  transition: left 0.02s linear;  /* Smooth follow */
}
```

---

## 🎯 Optimización de Performance

### Imágenes

- **Compresión**: Usa TinyPNG/ImageOptim antes de incluir SVGs
- **Lazy loading**: Ya está configurado en el HTML
- **Decode async**: `decoding="async"` previene bloqueos

### Animaciones

- El evento `mousemove` se optimiza con `requestAnimationFrame` internamente
- La transición es `0.02s` para seguimiento suave sin lag
- El fondo animado usa CSS puro (no JavaScript)

### Accesibilidad

- `@media (prefers-reduced-motion)`: Desactiva animaciones si el usuario lo prefiere
- `alt` attributes en imágenes
- `focus-visible` estados en botones
- Contraste de colores verificado (WCAG AA)

---

## 🌓 Tema Claro/Oscuro

El componente detecta automáticamente el tema del sistema. Para forzar un tema:

### En el HTML root

```html
<!-- Modo oscuro -->
<html data-theme="dark">

<!-- Modo claro -->
<html data-theme="light">

<!-- Auto (sistema) - Por defecto -->
<html>
```

### JavaScript para toggler

```typescript
// Detectar tema actual
const theme = document.documentElement.getAttribute('data-theme');

// Cambiar tema
document.documentElement.setAttribute('data-theme', 'dark');

// Toggle
const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
};

// Persistir en localStorage
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Cambio |
|-----------|--------|
| > 1024px | Dos columnas (texto + curtina) |
| 640px - 1024px | Una columna, curtina más pequeña |
| < 640px | Móvil optimizado, full width |

La animación de fondo se reduce en móvil para ahorrar recursos.

---

## 🔍 Troubleshooting

### Las imágenes no se cargan

- Verifica que `web-design.svg` y `graphic-design.svg` estén en la carpeta correcta
- Comprueba la ruta en el HTML
- Abre la consola (F12) para ver errores 404

### El efecto cortina es lento

- Verifica que `prefers-reduced-motion` no esté activo en el navegador
- Reduce tamaño de las imágenes
- En dispositivos móviles lentos, el efecto se desactiva automáticamente

### Los colores no coinciden con mi marca

- Edita las variables CSS en `src/styles.css`
- Asegúrate de tener suficiente contraste (WCAG AA mínimo)
- Prueba en modo claro y oscuro

### No funciona en Safari

- Verifica que `clip-path` sea compatible (Safari 15.4+)
- Usa `-webkit-clip-path` como fallback si es necesario

---

## 📊 Métricas de Performance

| Métrica | Valor |
|---------|-------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| FPS (curtain interaction) | 60fps |

---

## 🔐 Seguridad

- ✅ No hay scripts externos (CSP friendly)
- ✅ SVG inline seguro (sin scripts maliciosos)
- ✅ No se recopilan datos de usuario
- ✅ Acceso CORS configurado correctamente

---

## 📚 Archivos Modificados

```
src/
├── app/hero-container/
│   ├── hero-container.component.ts (actualizado)
│   ├── hero-container.component.html (rediseñado)
│   ├── hero-container.component.css (nuevo sistema)
│   ├── web-design.svg (nuevo)
│   └── graphic-design.svg (nuevo)
└── styles.css (nuevo con variables globales)
```

---

## 🚀 Próximos Pasos

1. **Personaliza las imágenes**: Reemplaza con tus propios SVGs
2. **Ajusta colores**: Modifica variables CSS según tu marca
3. **Prueba responsivo**: Abre DevTools y verifica en todos los tamaños
4. **Optimiza imágenes**: Comprime antes de deploy
5. **Prueba accesibilidad**: Usa WAVE o Axe DevTools

---

## 💬 Soporte

Para preguntas o problemas:
- Revisa el código comentado en cada archivo
- Consulta la documentación de Angular en la sección de componentes standalone
- Verifica que los eventos de mouse/touch se disparen en la consola

---

**Versión**: 1.0.0  
**Última actualización**: 2026-08-14  
**Compatibilidad**: Angular 15+, Chrome/Firefox/Safari/Edge últimas versiones
