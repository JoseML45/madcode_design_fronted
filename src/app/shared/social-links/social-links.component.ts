import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [NgFor],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css'
})
export class SocialLinksComponent {
  @Input() links: SocialLink[] = [
    { name: 'LinkedIn', icon: 'in', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: 'gh', url: 'https://github.com' },
    { name: 'Twitter', icon: 'tw', url: 'https://twitter.com' }
  ];
}
