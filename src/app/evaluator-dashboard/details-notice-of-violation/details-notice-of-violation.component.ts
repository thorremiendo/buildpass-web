import { NoticeOfViolationService } from './../../core/services/notice-of-violation.service';
import { Component, OnInit } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

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
  public photoA: File;
  public photoB: File;

  constructor(private nov: NoticeOfViolationService) {}

  ngOnInit(): void {}

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'photoA':
        this.photoA = file;
        break;
      case 'photoB':
        this.photoB = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'photoA':
        this.photoA = null;
        break;
      case 'photoB':
        this.photoB = null;
        break;
    }
  }

  handleRemove(index) {
    this.selectedActions.splice(index, 1);
  }

  handleAction(e) {
    console.log(e);
    if (e.checked == true) {
      this.selectedActions.push(e.source.value);
    } else {
      const find = this.selectedActions.find(
        (element) => element == e.source.value
      );
      const index = this.selectedActions.indexOf(find);
      this.selectedActions.splice(index, 1);
    }
  }

  handleAddOthers() {
    this.selectedActions.push(this.actionOthers);
  }

  generatePdf() {
    this.nov.insertWaterMark().then((blob) => {});
  }
}
