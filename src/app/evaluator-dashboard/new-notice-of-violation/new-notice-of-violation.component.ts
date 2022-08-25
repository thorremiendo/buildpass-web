import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/core/services/mapbox.service';

@Component({
  selector: 'app-new-notice-of-violation',
  templateUrl: './new-notice-of-violation.component.html',
  styleUrls: ['./new-notice-of-violation.component.scss'],
})
export class NewNoticeOfViolationComponent implements OnInit {
  step;
  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.buildMap();
  }

  handleStep() {
    this.step = this.step = 2;
  }
}
