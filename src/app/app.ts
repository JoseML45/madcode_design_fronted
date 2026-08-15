import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroContainerComponent } from './hero-container/hero-container.component';
import { ValuePropositionComponent } from './sections/value-proposition/value-proposition.component';
import { FeaturesComponent } from './sections/features/features.component';
import { PortfolioPreviewComponent } from './sections/portfolio-preview/portfolio-preview.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { AboutMeComponent } from './sections/about-me/about-me.component';
import { FaqComponent } from './sections/faq/faq.component';
import { CtaFinalComponent } from './sections/cta-final/cta-final.component';
import { FooterComponent } from './sections/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeroContainerComponent,
    ValuePropositionComponent,
    FeaturesComponent,
    PortfolioPreviewComponent,
    TestimonialsComponent,
    AboutMeComponent,
    FaqComponent,
    CtaFinalComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-primer-proyecto');
}
