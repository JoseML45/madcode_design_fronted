import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TestimonialCardComponent } from '../../shared/testimonial-card/testimonial-card.component';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor, TestimonialCardComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      quote: 'El diseño que realizó transformó completamente nuestra plataforma. Nuestros usuarios reportan una experiencia mucho más intuitiva y nuestras conversiones aumentaron 45%.',
      author: 'María González',
      role: 'CEO',
      company: 'TechStartup',
      rating: 5
    },
    {
      quote: 'Profesional, atento a detalles y con gran entendimiento de UX/UI. El sistema de diseño que creó es escalable y perfecto para nuestro equipo.',
      author: 'Carlos López',
      role: 'Product Manager',
      company: 'Digital Solutions',
      rating: 5
    },
    {
      quote: 'Excelente trabajo en la redefinición de nuestro app móvil. La accesibilidad y el diseño intuitivo han sido notados por nuestros usuarios.',
      author: 'Ana Martínez',
      role: 'Directora de Producto',
      company: 'FinanceApp',
      rating: 5
    }
  ];
}
