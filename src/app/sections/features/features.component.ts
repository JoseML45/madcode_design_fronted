import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../core/services/feature.service';
import { Feature } from '../../core/domain/models/feature.model';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent implements OnInit {
  features: Feature[] = [];

  constructor(private featureService: FeatureService) {}

  ngOnInit(): void {
    this.featureService.getFeatures().subscribe(
      (features) => {
        this.features = features;
      }
    );
  }
}
