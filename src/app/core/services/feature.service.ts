import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature } from '../domain/models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private features: Feature[] = [
    {
      id: 1,
      icon: '🎨',
      title: 'Diseño Responsivo',
      description: 'Interfaces que se adaptan a cualquier dispositivo'
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Alto Rendimiento',
      description: 'Optimización máxima y velocidad comprobada'
    },
    {
      id: 3,
      icon: '🔒',
      title: 'Seguridad Garantizada',
      description: 'Protección de datos con estándares internacionales'
    },
    {
      id: 4,
      icon: '♿',
      title: 'Accesibilidad',
      description: 'Diseño inclusivo para todos los usuarios'
    }
  ];

  constructor() {}

  getFeatures(): Observable<Feature[]> {
    return of(this.features);
  }

  getFeatureById(id: number): Observable<Feature | undefined> {
    return of(this.features.find(f => f.id === id));
  }
}
