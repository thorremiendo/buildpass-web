import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-notice-of-violation',
  templateUrl: './details-notice-of-violation.component.html',
  styleUrls: ['./details-notice-of-violation.component.scss'],
})
export class DetailsNoticeOfViolationComponent implements OnInit {
  actionsList = [
    {
      id: 1,
      title:
        'Cease and Desist from further construction activities IMMEDIATELY upon receipt hereof. Failure to do so shall cause this Office to institute appropriate actions against you.',
    },
    {
      id: 2,
      title:
        'You or your representative shall contact this Office within three (3) days and submit NOTARIZED explanation/answer to this notice attaching title/deed of sale/order of award.',
    },
  ];
  selectedActions = [];
  actionOthers;
  constructor() {}

  ngOnInit(): void {}

  handleAction(e) {
    console.log(e);
    if (e.checked == true) {
      this.selectedActions.push(e.source.value);
    }
  }

  handleAddOthers() {
    this.selectedActions.push(this.actionOthers);
  }
}
