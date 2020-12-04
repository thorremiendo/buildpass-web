import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormDetailsComponent } from '../form-details/form-details.component';

const FORM_TABLE_DATA = [
  { name: 'Zoning Clearance Application Form', status: 'For Checking' },
  { name: 'Building Permit Form', status: 'For Checking' },
  { name: 'Sanitary Permit Form', status: 'For Checking' },
  { name: 'Electrical Permit Form', status: 'For Checking' },
  {
    name: 'Authorization Letter of Special Power of Attorney',
    status: 'For Checking',
  },
  { name: 'Filing Fee proof of payment (receipt)', status: 'For Checking' },
  {
    name: 'Tax Declaration from City Assessors Office',
    status: 'For Checking',
  },
  {
    name: 'Latest Quarter of the Real Property Tax Receipt',
    status: 'For Checking',
  },
  { name: 'Clear Latest picture of site/are', status: 'For Checking' },
];
@Component({
  selector: 'app-cbao-evaluator',
  templateUrl: './cbao-evaluator.component.html',
  styleUrls: ['./cbao-evaluator.component.scss'],
})
export class CbaoEvaluatorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'action'];
  dataSource = FORM_TABLE_DATA;
  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openFormDialog(): void {
    const dialogRef = this.dialog.open(FormDetailsComponent, {
      width: '1500px',
      height: '2000px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
