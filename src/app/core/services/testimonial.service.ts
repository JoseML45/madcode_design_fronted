import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Testimonial } from '../domain/models/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Juan García',
      role: 'CEO',
      company: 'TechStartup Co.',
      content: 'El diseño transformó completamente nuestra plataforma. Los resultados fueron inmediatos.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'María López',
      role: 'Product Manager',
      company: 'Digital Solutions',
      content: 'Profesionalidad y atención al detalle en cada aspecto del proyecto.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      role: 'Founder',
      company: 'Creative Agency',
      content: 'Recomendado al 100%. Entendió nuestras necesidades a la perfección.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    }
  ];

  constructor() {}

  getTestimonials(): Observable<Testimonial[]> {
    return of(this.testimonials);
  }

  getTestimonialById(id: number): Observable<Testimonial | undefined> {
    return of(this.testimonials.find(t => t.id === id));
  }

  getRandomTestimonial(): Observable<Testimonial | undefined> {
    const random = Math.floor(Math.random() * this.testimonials.length);
    return of(this.testimonials[random]);
  }
}
