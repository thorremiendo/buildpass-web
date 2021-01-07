import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { documentTypes } from '../../core/enums/document-type.enum';
import { documentStatus } from '../../core/enums/document-status.enum';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-cpdo-evaluator',
  templateUrl: './cpdo-evaluator.component.html',
  styleUrls: ['./cpdo-evaluator.component.scss'],
})
export class CpdoEvaluatorComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];
  public user;
  public dataSource;
  public forms;
  public applicationId;
  public evaluatorDetails;
  public isLoading: boolean = true;
  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        this.forms = result.data;
        this.generateCpdoForms();
        this.fetchEvaluatorDetails();
      });
    this.changeDetectorRefs.detectChanges();
  }
  fetchEvaluatorDetails() {
    this.userService.cast.subscribe((userSubject) => {
      this.user = userSubject;
      this.evaluatorDetails = this.user.employee_detail;
      console.log('Evaluator Details', this.evaluatorDetails);
      this.isLoading = false;
    });
  }
  generateCpdoForms() {
    const CPDO_FORMS = this.forms.filter(
      (obj) =>
        obj.document_id == 1 ||
        obj.document_id == 28 ||
        obj.document_id == 26 ||
        obj.document_id == 27 ||
        obj.document_id == 23 ||
        obj.document_id == 24 ||
        obj.document_id == 27
    );
    this.dataSource = CPDO_FORMS;
  }
  getDocType(id): string {
    return documentTypes[id];
  }
  getDocStatus(id): string {
    return documentStatus[id];
  }

  openFormDialog(element): void {
    console.log(element);
    const dialogRef = this.dialog.open(FormDetailsComponent, {
      width: '1500px',
      height: '2000px',
      data: {
        evaluator: this.evaluatorDetails,
        form: element,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
