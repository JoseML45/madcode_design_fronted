import { Component, OnInit } from '@angular/core';
import { CtaButtonComponent } from '../../shared/cta-button/cta-button.component';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/domain/models/project.model';

@Component({
  selector: 'app-portfolio-preview',
  standalone: true,
  imports: [CtaButtonComponent],
  templateUrl: './portfolio-preview.component.html',
  styleUrl: './portfolio-preview.component.css'
})
export class PortfolioPreviewComponent implements OnInit {
  allProjects: Project[] = [];
  displayedProjects: Project[] = [];
  showCarousel = false;
  currentCarouselIndex = 0;
  private readonly INITIAL_DISPLAY = 3;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (projects) => {
        this.allProjects = projects;
        this.displayedProjects = projects.slice(0, this.INITIAL_DISPLAY);
      }
    );
  }

  openCarousel(): void {
    this.showCarousel = true;
    this.currentCarouselIndex = 0;
  }

  closeCarousel(): void {
    this.showCarousel = false;
  }

  nextProject(): void {
    if (this.currentCarouselIndex < this.allProjects.length - 1) {
      this.currentCarouselIndex++;
    }
  }

  previousProject(): void {
    if (this.currentCarouselIndex > 0) {
      this.currentCarouselIndex--;
    }
  }

  getCurrentProject(): Project {
    return this.allProjects[this.currentCarouselIndex];
  }
}
