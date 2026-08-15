import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  templateUrl: './cta-button.component.html',
  styleUrl: './cta-button.component.css'
})
export class CtaButtonComponent {
  @Input() text: string = 'Contactar';
  @Input() href: string = '#';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() target?: '_blank' | '_self' = '_self';
}
