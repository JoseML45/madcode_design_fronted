# Arquitectura de la Aplicación

## 📋 Estructura General

```
src/app/
├── core/
│   ├── domain/
│   │   └── models/
│   │       ├── project.model.ts
│   │       ├── feature.model.ts
│   │       └── testimonial.model.ts
│   └── services/
│       ├── project.service.ts
│       ├── feature.service.ts
│       └── testimonial.service.ts
├── sections/
│   ├── portfolio-preview/
│   ├── features/
│   ├── testimonials/
│   └── ...
└── shared/
    └── components/
```

---

## 🏗️ Patrones Implementados

### 1. **Service Layer Pattern**
Cada entidad de negocio tiene su propio servicio:
- `ProjectService` → datos de proyectos
- `FeatureService` → datos de características
- `TestimonialService` → datos de testimonios

### 2. **Dependency Injection (DI)**
Angular inyecta los servicios automáticamente:
```typescript
constructor(
  private projectService: ProjectService,
  private featureService: FeatureService,
  private testimonialService: TestimonialService
) {}
```

### 3. **Observable Pattern**
Todos los servicios retornan `Observable<T>`:
```typescript
getProjects(): Observable<Project[]> {
  return of(this.projects); // Actualmente mock data
}
```

En el futuro con REST:
```typescript
getProjects(): Observable<Project[]> {
  return this.http.get<Project[]>('/api/projects');
}
```

---

## 📊 Cómo se Comporta Cuando se Agrega un Nuevo Servicio

### Paso 1: Crear el Modelo
```typescript
// src/app/core/domain/models/blog.model.ts
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: Date;
  author: string;
}
```

### Paso 2: Crear el Servicio
```typescript
// src/app/core/services/blog.service.ts
@Injectable({ providedIn: 'root' })
export class BlogService {
  private posts: BlogPost[] = [...];

  getBlogPosts(): Observable<BlogPost[]> {
    return of(this.posts);
  }
}
```

### Paso 3: Inyectar en el Componente
```typescript
constructor(private blogService: BlogService) {}

ngOnInit(): void {
  this.blogService.getBlogPosts().subscribe(posts => {
    this.posts = posts;
  });
}
```

**Total: 3 pasos, cero duplicación de código.**

---

## ⚡ Cómo Escala el Sistema

### Jerarquía de Inyección

```
Angular App Root
    ↓
  Components
    ├── PortfolioPreview (inyecta ProjectService)
    ├── Features (inyecta FeatureService)
    ├── Testimonials (inyecta TestimonialService)
    └── Blog (inyecta BlogService)
    ↓
  Services (providedIn: 'root')
    ├── ProjectService (singleton)
    ├── FeatureService (singleton)
    ├── TestimonialService (singleton)
    └── BlogService (singleton)
```

**Puntos clave:**

1. **providedIn: 'root'** → Una sola instancia para toda la app (singleton)
2. **Sin conflictos de nombre** → Cada servicio es independiente
3. **Zero coupling** → Componentes no conocen detalles de otros servicios
4. **Fácil testing** → Puedes mockear servicios en tests

---

## 🔄 Ciclo de Vida: Múltiples Servicios

Cuando un componente inyecta 3 servicios:

```
1. Angular instancia el componente
   ↓
2. Pide ProjectService (si no existe, lo crea)
   ↓
3. Pide FeatureService (si no existe, lo crea)
   ↓
4. Pide TestimonialService (si no existe, lo crea)
   ↓
5. Constructor del componente se ejecuta
   ↓
6. ngOnInit() se ejecuta
   ↓
7. Se suscriben a los Observables
   ↓
8. Los datos se cargan en paralelo
```

**Comportamiento:** Los 3 servicios cargan datos EN PARALELO (simultáneamente).

---

## 📈 Rendimiento: Qué Pasa Cuando se "Desborda"

### Escenario: 10 Servicios + 100 Componentes

#### Sin optimización (actual):
```
- Cada componente se suscribe a sus servicios
- Si 5 componentes usan ProjectService
  → 5 suscripciones simultáneas
  → Sin problemas (los datos son los mismos)
```

#### Soluciones para cuando crece:

**1. Usar un Facade Service** (patrón recomendado)
```typescript
// Un servicio que coordina otros servicios
@Injectable({ providedIn: 'root' })
export class AppDataService {
  constructor(
    private projectService: ProjectService,
    private featureService: FeatureService,
    private testimonialService: TestimonialService
  ) {}

  loadAllData(): Observable<{
    projects: Project[];
    features: Feature[];
    testimonials: Testimonial[];
  }> {
    return combineLatest([
      this.projectService.getProjects(),
      this.featureService.getFeatures(),
      this.testimonialService.getTestimonials()
    ]).pipe(
      map(([projects, features, testimonials]) => ({
        projects,
        features,
        testimonials
      }))
    );
  }
}
```

**2. Usar ShareReplay** (caché automático)
```typescript
private projects$ = this.http.get<Project[]>('/api/projects')
  .pipe(shareReplay(1)); // Cachea el resultado

getProjects(): Observable<Project[]> {
  return this.projects$;
}
```

**3. Lazy Loading de Servicios**
```typescript
// Solo crear el servicio cuando se necesita
constructor(private injector: Injector) {}

loadBlog() {
  const blogService = this.injector.get(BlogService);
  // Ahora sí se crea
}
```

---

## 🎯 Comparación: Con vs Sin Servicios

### ❌ Sin Servicios (Problema)
```typescript
export class PortfolioComponent {
  projects = [
    { id: 1, title: '...', ... },
    { id: 2, title: '...', ... },
  ];
  
  features = [
    { id: 1, icon: '🎨', ... },
  ];
  
  testimonials = [
    { id: 1, name: '...', ... },
  ];
  // Duplicado en 10 componentes más = CAOS
}
```

**Problemas:**
- ❌ Datos duplicados en múltiples componentes
- ❌ Si cambias un dato, editas 10 archivos
- ❌ No hay caché compartido
- ❌ Imposible testear

### ✅ Con Servicios (Solución)
```typescript
export class PortfolioComponent {
  projects: Project[] = [];
  features: Feature[] = [];
  testimonials: Testimonial[] = [];

  constructor(
    private projectService: ProjectService,
    private featureService: FeatureService,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe(p => this.projects = p);
    this.featureService.getFeatures()
      .subscribe(f => this.features = f);
    this.testimonialService.getTestimonials()
      .subscribe(t => this.testimonials = t);
  }
}
```

**Ventajas:**
- ✅ Datos centralizados en un lugar
- ✅ Cambios en un archivo (el servicio)
- ✅ Caché automático (providedIn: 'root')
- ✅ Fácil de testear y mockear
- ✅ Carga en paralelo sin bloqueos

---

## 📦 Escalabilidad: Crecimiento Esperado

| Cantidad | Patrón | Recomendación |
|----------|--------|---------------|
| 3-5 servicios | Service Layer ✅ | Lo actual está bien |
| 6-10 servicios | + Facade Service | Agrupar servicios relacionados |
| 10+ servicios | + State Management (NgRx) | Considerar Redux/NgRx |
| 20+ servicios | + Micro-frontends | Dividir en módulos independientes |

---

## 🚀 Transición a REST API

### Antes (Mock)
```typescript
getProjects(): Observable<Project[]> {
  return of(this.projects);
}
```

### Después (REST)
```typescript
constructor(private http: HttpClient) {}

getProjects(): Observable<Project[]> {
  return this.http.get<Project[]>(`${this.apiUrl}/projects`)
    .pipe(
      catchError(error => {
        console.error('Error loading projects', error);
        return of([]);
      }),
      shareReplay(1)
    );
}
```

**Cambios necesarios en componentes:** NINGUNO ✨

---

## 🔍 Testing

### Con Servicios es trivial:
```typescript
describe('PortfolioComponent', () => {
  it('should load projects on init', () => {
    const mockProjects = [{ id: 1, title: 'Test', ... }];
    const mockService = jasmine.createSpyObj('ProjectService', ['getProjects']);
    mockService.getProjects.and.returnValue(of(mockProjects));

    TestBed.configureTestingModule({
      providers: [
        { provide: ProjectService, useValue: mockService }
      ]
    });

    const component = TestBed.createComponent(PortfolioComponent);
    expect(component.projects).toEqual(mockProjects);
  });
});
```

---

## 📝 Resumen

| Aspecto | Beneficio |
|--------|-----------|
| **Escalabilidad** | Agregar 10 servicios = 10 minutos |
| **Mantenimiento** | Cambio de dato = 1 archivo |
| **Testing** | Mock fácil, tests rápidos |
| **Performance** | Carga paralela, caché automático |
| **Futuro** | Transición a REST sin cambiar componentes |

---

**Estado Actual:** ✅ Arquitectura lista para producción  
**Próximo Paso:** Implementar HttpClient cuando conectes API REST
