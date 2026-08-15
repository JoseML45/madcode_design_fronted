import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-container',
  standalone: true,
  templateUrl: './hero-container.component.html',
  styleUrl: './hero-container.component.css'
})
export class HeroContainerComponent implements OnInit, OnDestroy {
  @ViewChild('curtainWrapper') curtainWrapper!: ElementRef;
  @ViewChild('curtainDivider') curtainDivider!: ElementRef;

  private curtainX = 50;
  private direction = 1;
  private animationSubscription: Subscription | null = null;
  private pauseTimeout: any = null;
  private isAnimating = true;
  private readonly ANIMATION_SPEED = 1;
  private readonly ANIMATION_INTERVAL = 50;
  private readonly PAUSE_TIME = 30000;

  ngOnInit() {
    if (this.curtainWrapper) {
      this.curtainWrapper.nativeElement.style.setProperty('--curtain-x', '50%');
    }
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
    }
  }

  private startAnimation() {
    this.animationSubscription = interval(this.ANIMATION_INTERVAL).subscribe(() => {
      if (!this.isAnimating) return;

      this.curtainX += this.direction * this.ANIMATION_SPEED;

      if (this.curtainX >= 100) {
        this.curtainX = 100;
        this.direction = -1;
        this.pauseAnimation();
      } else if (this.curtainX <= 0) {
        this.curtainX = 0;
        this.direction = 1;
        this.pauseAnimation();
      }

      this.updateCurtain(this.curtainX);
    });
  }

  private pauseAnimation() {
    this.isAnimating = false;

    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
    }

    this.pauseTimeout = setTimeout(() => {
      this.isAnimating = true;
    }, this.PAUSE_TIME);
  }

  private updateCurtain(percentage: number) {
    if (this.curtainDivider) {
      this.curtainDivider.nativeElement.style.left = `${percentage}%`;
    }
    if (this.curtainWrapper) {
      this.curtainWrapper.nativeElement.style.setProperty('--curtain-x', `${percentage}%`);
    }
  }
}
