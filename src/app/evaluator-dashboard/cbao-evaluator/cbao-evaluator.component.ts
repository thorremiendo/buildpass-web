import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormDetailsComponent } from '../form-details/form-details.component';

const FORM_TABLE_DATA = [
  {
    name: 'Zoning Clearance Application Form',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Building Permit Form',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Sanitary Permit Form',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Electrical Permit Form',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Authorization Letter of Special Power of Attorney',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Filing Fee proof of payment (receipt)',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Tax Declaration from City Assessors Office',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Latest Quarter of the Real Property Tax Receipt',
    status: '--',
    remarks: '--',
  },
  {
    name: 'Clear Latest picture of site/are',
    status: '--',
    remarks: '--',
  },
];
@Component({
  selector: 'app-cbao-evaluator',
  templateUrl: './cbao-evaluator.component.html',
  styleUrls: ['./cbao-evaluator.component.scss'],
})
export class CbaoEvaluatorComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];
  dataSource = FORM_TABLE_DATA;
  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openFormDialog(element): void {
    const dialogRef = this.dialog.open(FormDetailsComponent, {
      width: '1500px',
      height: '2000px',
      data: {
        name: element,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }
}
