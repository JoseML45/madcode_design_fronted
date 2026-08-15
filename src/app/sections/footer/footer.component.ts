import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks: SocialLink[] = [
    { name: 'LinkedIn', icon: 'in', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: 'gh', url: 'https://github.com' },
    { name: 'Twitter', icon: 'tw', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'ig', url: 'https://instagram.com' }
  ];

  links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Contacto', href: '#contacto' }
  ];
}
