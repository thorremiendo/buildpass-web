import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  applicationNo: string;
  postedDate: string;

  progress: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    applicationNo: 'A2020-1',
    postedDate: '11-10-2020',

    progress: '50%',
  },
  {
    applicationNo: 'A2020-2',
    postedDate: '11-10-2020',

    progress: '50%',
  },
  {
    applicationNo: 'A2020-3',
    postedDate: '11-10-2020',

    progress: '50%',
  },
  {
    applicationNo: 'A2020-4',
    postedDate: '11-10-2020',

    progress: '50%',
  },
];
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  displayedColumns: string[] = [
    'applicationNo',
    'postedDate',
    'progress',
    'action',
  ];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goToApplicationInfo() {
    this.router.navigateByUrl('/evaluator/application');
  }
}
