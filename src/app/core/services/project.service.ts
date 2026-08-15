import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../domain/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Rediseño completo de plataforma de ventas online',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab655c486?w=500&h=300&fit=crop',
      tags: ['UX/UI', 'E-Commerce', 'Web Design']
    },
    {
      id: 2,
      title: 'Mobile App Design',
      description: 'Aplicación móvil de finanzas personales',
      image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=500&h=300&fit=crop',
      tags: ['Mobile', 'App Design', 'UI']
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      description: 'Dashboard de analytics para empresas',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      tags: ['SaaS', 'Dashboard', 'UX']
    },
    {
      id: 4,
      title: 'Branding Visual Identity',
      description: 'Sistema de marca completo para startup tech',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      tags: ['Branding', 'Design System', 'Visual Identity']
    },
    {
      id: 5,
      title: 'Website Rediseño',
      description: 'Rediseño completo de sitio corporativo',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      tags: ['Web Design', 'UX/UI', 'Responsive']
    },
    {
      id: 6,
      title: 'App Social Network',
      description: 'Red social con features de streaming en vivo',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      tags: ['App Design', 'Social Media', 'UI']
    }
  ];

  constructor() {}

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return of(this.projects.find(p => p.id === id));
  }
}
