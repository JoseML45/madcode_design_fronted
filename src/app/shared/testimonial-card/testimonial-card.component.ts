import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css'
})
export class TestimonialCardComponent {
  @Input() quote: string = '';
  @Input() author: string = '';
  @Input() role: string = '';
  @Input() company: string = '';
  @Input() rating: number = 5;
}
