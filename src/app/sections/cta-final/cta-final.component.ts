import { Component } from '@angular/core';
import { CtaButtonComponent } from '../../shared/cta-button/cta-button.component';

@Component({
  selector: 'app-cta-final',
  standalone: true,
  imports: [CtaButtonComponent],
  templateUrl: './cta-final.component.html',
  styleUrl: './cta-final.component.css'
})
export class CtaFinalComponent {}
