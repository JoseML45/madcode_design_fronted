import { Component } from '@angular/core';

@Component({
  selector: 'app-value-proposition',
  standalone: true,
  templateUrl: './value-proposition.component.html',
  styleUrl: './value-proposition.component.css'
})
export class ValuePropositionComponent {
  benefits = [
    {
      title: 'Diseño que Convierte',
      description: 'Interfaces intuitivas que guían a tus usuarios hacia la conversión'
    },
    {
      title: 'UX/UI Profesional',
      description: 'Diseños modernos y accesibles que reflejan la calidad de tu marca'
    },
    {
      title: 'Resultados Medibles',
      description: 'Aumento de engagement, retención y satisfacción del usuario'
    }
  ];
}
