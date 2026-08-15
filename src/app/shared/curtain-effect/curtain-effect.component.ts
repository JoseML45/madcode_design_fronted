import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-curtain-effect',
  standalone: true,
  templateUrl: './curtain-effect.component.html',
  styleUrl: './curtain-effect.component.css'
})
export class CurtainEffectComponent {
  @Input() imageUrl: string = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop';
  @Input() title: string = 'Proyecto destacado';

  isOpen = false;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isOpen = false;
  }

  toggleCurtain(): void {
    this.isOpen = !this.isOpen;
  }
}
