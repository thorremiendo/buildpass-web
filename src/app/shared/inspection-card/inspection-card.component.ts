import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { inspectionStatus } from './../../core/enums/inspection-status.enum';
import { officeTypes } from '../../core/enums/offices.enum';
@Component({
  selector: 'app-inspection-card',
  templateUrl: './inspection-card.component.html',
  styleUrls: ['./inspection-card.component.scss'],
})
export class InspectionCardComponent implements OnInit {
  @Input() details;
  @Input() date;
  @Input() application;
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('inspection card', this.date);
  }

  getInspectionStatus(id): string {
    return inspectionStatus[id];
  }

  getOffice(id): string {
    return officeTypes[id];
  }
}
