import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface FAQItem {
  question: string;
  answer: string;
  open?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqs: FAQItem[] = [
    {
      question: '¿Cuál es tu proceso de diseño?',
      answer: 'Comenzamos con una sesión de descubrimiento para entender tus objetivos. Luego realizamos investigación de usuarios, creamos wireframes, diseños de alta fidelidad y finalmente prototipos interactivos.',
      open: true
    },
    {
      question: '¿Cuánto tiempo toma un proyecto típico?',
      answer: 'Los proyectos varían, pero generalmente un diseño completo de UI/UX toma entre 4-8 semanas dependiendo del alcance y complejidad.'
    },
    {
      question: '¿Qué incluye en los servicios de diseño?',
      answer: 'Incluyo investigación de usuario, wireframing, diseño visual, creación de design systems, prototipos interactivos y hand-off para desarrollo.'
    },
    {
      question: '¿Ofreces revisiones ilimitadas?',
      answer: 'Sí, ofrezco revisiones ilimitadas durante el proyecto. Mi objetivo es que estés completamente satisfecho con el resultado.'
    },
    {
      question: '¿Cuáles son tus honorarios?',
      answer: 'Los precios varían según el alcance del proyecto. Ofrezco presupuestos personalizados tras una consulta inicial. No tengo precios fijos para garantizar que cada proyecto sea único.'
    }
  ];

  toggleFAQ(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
