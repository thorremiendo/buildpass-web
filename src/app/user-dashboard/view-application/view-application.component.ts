import { InspectionDetailsComponent } from './../../shared/inspection-details/inspection-details.component';
import { SchedulingService } from './../../core/services/scheduling.service';
import { AppTitleService } from './../../core/services/app-title.service';
import { AssociateBpEgppComponent } from './../../shared/associate-bp-egpp/associate-bp-egpp.component';
import { WaterMarkService } from './../../core/services/watermark.service';
import { RepresentativeDetailsComponent } from './../../shared/representative-details/representative-details.component';
import { RemarksHistoryTableComponent } from './../../evaluator-dashboard/remarks-history-table/remarks-history-table.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { documentStatus } from '../../core/enums/document-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';
import { AuthService, UserService } from 'src/app/core';
import { ProjectDetailsComponent } from 'src/app/evaluator-dashboard/project-details/project-details.component';
import { FormDetailsComponent } from 'src/app/evaluator-dashboard/form-details/form-details.component';
import { applicationStatus } from '../../core/enums/application-status.enum';
import Swal from 'sweetalert2';
import { ViewFeesComponent } from 'src/app/evaluator-dashboard/view-fees/view-fees.component';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { constructionType } from '../../core/enums/construction-type.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  panelOpenState = false;
  public isAuthorized;
  public isLoading = true;
  public applicationId;
  public evaluatorDetails;
  public user;
  public pdfSrc;
  public applicationDetails;
  public applicationDate;
  public dataSource;
  public documentTypes;
  public inspections = [];
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];
  public searchKey = new FormControl('');
  public unfilteredData = null;
  viewNonCompliant = new FormControl();
  constructor(
    private applicationService: ApplicationInfoService,
    private newApplicationService: NewApplicationService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private applicationFeeService: ApplicationFeesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private pdfService: WaterMarkService,
    private appTitle: AppTitleService,
    private inspectionService: SchedulingService
  ) {
    this.viewNonCompliant.valueChanges.subscribe((e) => {
      console.log(e);
      if (e == true) {
        this.isLoading = true;
        this.applicationService
          .fetchUserDocs(this.applicationId)
          .subscribe((result) => {
            if (
              this.applicationDetails.is_amendment == 2 &&
              this.applicationDetails.permit_type_id == 2
            ) {
              let filter = result.data.filter((e) => e.is_duplicate == 1);
              let bfpCepmoDocs = result.data.filter(
                (e) => e.is_duplicate !== 1 && e.document_status_id == 2
              );
              filter.push(...bfpCepmoDocs);
              filter = filter.filter((e) => e.document_status_id == 2);
              this.sortUserDocs(filter);
            } else {
              this.sortUserDocs(
                result.data.filter((e) => e.document_status_id == 2)
              );
            }
            this.unfilteredData = result.data;
          });
      } else {
        this.fetchUserDocs();
      }
    });
  }
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1600px',
      data: {
        projectDetails: this.applicationDetails.project_detail,
        applicationId: this.applicationId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  openRepresentativeDialog() {
    const dialogRef = this.dialog.open(RepresentativeDetailsComponent, {
      width: '1200px',
      height: '1200px',
      data: {
        representativeDetails: this.applicationDetails.representative_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  openFeesDialog() {
    this.applicationFeeService
      .fetchFees(this.applicationId)
      .subscribe((res) => {
        const dialogRef = this.dialog.open(ViewFeesComponent, {
          width: '1000px',
          data: {
            fees: res.data,
            applicationId: this.applicationId,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {});
      });
  }
  viewFlattenPdf(pdfUrl) {
    this.pdfService.flattenForm(pdfUrl);
  }

  openAssociateBpEgpp(id) {
    const dialogRef = this.dialog.open(AssociateBpEgppComponent, {
      data: {
        applicationDetails: this.applicationDetails,
        userDetails: this.user,
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {
    this.appTitle.setTitle('BuildPASS');
    this.fetchDocTypes();
    this.isAuthorized = false;
    this.applicationId = this.route.snapshot.params.id;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.searchKey.valueChanges.subscribe((res) => {
      this.sortUserDocs(
        this.unfilteredData.filter((document) => {
          const docName = document.docName;
          if (docName && docName.toLowerCase().includes(res.toLowerCase()))
            return true;
          else return false;
        })
      );
    });
  }

  fetchDocTypes() {
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;
      this.applicationService
        .verifyUserApplication(this.applicationId, this.user.id)
        .subscribe(
          (res) => {
            this.isLoading = true;
            this.isAuthorized = true;
            this.fetchApplicationInspections();
            this.fetchApplicationInfo();
          },
          (error) => {
            this.router.navigateByUrl('dashboard/applications');
          }
        );
    });
  }
  getConstructionType(id): string {
    return constructionType[id];
  }

  fetchApplicationInfo() {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        this.fetchUserDocs();
        if (this.applicationDetails.application_status_id == 27) {
          Swal.fire({
            title: 'For Amendment',
            text: 'Your application for Certificate of Occupancy cannot be processed as of the moment due to non conformance with the approved Building Permit. Hence, you are required to secure an amended building permit following the Building Permit process. For inquiries, please contact us.',
            icon: 'info',
          });
        }
      });
  }
  fetchUserDocs() {
    this.isLoading = true;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        if (
          this.applicationDetails.is_amendment == 2 &&
          this.applicationDetails.permit_type_id == 2
        ) {
          let filter = result.data.filter((e) => e.is_duplicate == 1);
          let bfpCepmoDocs = result.data.filter(
            (e) => e.is_duplicate !== 1 && e.document_status_id == 2
          );
          filter.push(...bfpCepmoDocs);

          this.sortUserDocs(filter);
        } else {
          this.sortUserDocs(result.data);
        }
        this.unfilteredData = result.data;
      });
  }
  sortUserDocs(forms) {
    const sortedForms = {
      forms: {
        label: 'Forms',
        data: [],
      },
      documents: {
        label: 'Documentary Requirements',
        data: [],
      },
      plans: {
        label: 'Plans, Designs, Specifications, Cost Estimate',
        data: [],
      },
      professional: {
        label:
          'Photocopy of Professional Details (Professional Tax Receipt and Professional Regulation Commission ID, signed and sealed)',
        data: [],
      },
      affidavits: {
        label: 'Affidavits',
        data: [],
      },
      others: {
        label: 'Others',
        data: [],
      },
    };

    const filteredDocs = forms.filter(
      (doc) =>
        doc.document_id !== 50 &&
        doc.document_id !== 107 &&
        doc.document_id !== 80 &&
        doc.document_id !== 225
    );
    filteredDocs.forEach((element) => {
      const docType =
        this.documentTypes[element.document_id - 1].document_category_id;
      const docName = this.documentTypes[element.document_id - 1].name;
      element.docName = docName;

      switch (docType) {
        case 1:
          sortedForms.forms.data.push(element);
          break;
        case 2:
          sortedForms.documents.data.push(element);
          break;
        case 3:
          sortedForms.plans.data.push(element);
          break;
        case 4:
          sortedForms.professional.data.push(element);
          break;
        case 5:
          sortedForms.affidavits.data.push(element);
          break;
        default:
          sortedForms.others.data.push(element);
          break;
      }
    });
    this.dataSource = Object.values(sortedForms);
    this.dataSource = [
      {
        label: this.dataSource[0].data.length
          ? this.dataSource[0].label
          : 'hidden',
      },
      ...this.dataSource[0].data,
      {
        label: this.dataSource[1].data.length
          ? this.dataSource[1].label
          : 'hidden',
      },
      ...this.dataSource[1].data,
      {
        label: this.dataSource[2].data.length
          ? this.dataSource[2].label
          : 'hidden',
      },
      ...this.dataSource[2].data,
      {
        label: this.dataSource[3].data.length
          ? this.dataSource[3].label
          : 'hidden',
      },
      ...this.dataSource[3].data,
      {
        label: this.dataSource[4].data.length
          ? this.dataSource[4].label
          : 'hidden',
      },
      ...this.dataSource[4].data,
      {
        label: this.dataSource[5].data.length
          ? this.dataSource[5].label
          : 'hidden',
      },
      ...this.dataSource[5].data,
    ];
    this.isLoading = false;
  }

  getDocName(id): string {
    return this.documentTypes[id - 1].name;
  }
  getDocStatus(id): string {
    return documentStatus[id];
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  getApplicationType(id): string {
    return applicationTypes[id];
  }
  checkFormNonCompliant() {
    const isNonCompliant = this.dataSource.find(
      (form) => form.document_status_id == 2
    );
    return isNonCompliant;
  }
  onSave() {
    this.isLoading = true;
    if (!this.checkFormNonCompliant()) {
      if (this.checkDepartmentNonCompliant()) {
        const body = {
          application_status_id: 3,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.updateDepartmentStatus();
          });
      } else if (this.applicationDetails.cpdo_status_id == 2) {
        const body = {
          application_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CPDO Inspector for Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else if (
        this.applicationDetails.cpdo_cod_status_id == 2 &&
        this.applicationDetails.cpdo_status_id == 1
      ) {
        const body = {
          application_status_id: 10,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CPDO Coordinator for re-evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else if (
        this.applicationDetails.dc_status_id == 2 ||
        this.applicationDetails.bo_status_id == 2
      ) {
        const body = {
          application_status_id: 3,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.updateDepartmentStatus();
          });
      } else {
        const body = {
          application_status_id: 1,
          receiving_status_id: 0,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CBAO Receiving for Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      }
    } else {
      Swal.fire(
        'Warning!',
        `Please check non-compliant douments!`,
        'warning'
      ).then((result) => {
        this.isLoading = false;
      });
    }
  }
  updateDepartmentStatus() {
    const app = this.applicationDetails;
    const status = [
      {
        parallel_cepmo_status_id: app.parallel_cepmo_status_id,
      },
      {
        parallel_bfp_status_id: app.parallel_bfp_status_id,
      },
      {
        parallel_cbao_status_id: app.parallel_cbao_status_id,
      },
    ];
    const isNonCompliant = status.forEach((dep) => {
      if (dep.parallel_cepmo_status_id == 2) {
        const body = {
          parallel_cepmo_status_id: 0,
        };
        this.updateApplication(body);
      } else if (dep.parallel_bfp_status_id == 2) {
        const body = {
          parallel_bfp_status_id: 0,
        };
        this.updateApplication(body);
      } else if (dep.parallel_cbao_status_id == 2) {
        const body = {
          parallel_cbao_status_id: 0,
        };
        this.updateApplication(body);
      } else {
        Swal.fire('Success!', `Forwarded for Re-Evaluation!`, 'success').then(
          (result) => {
            this.isLoading = false;
            window.location.reload();
          }
        );
      }
    });
    this.updateTechnicalEvaluatorStatus();
    return isNonCompliant;
  }
  updateTechnicalEvaluatorStatus() {
    const app = this.applicationDetails;
    const status = [
      {
        cbao_arch_status_id: app.cbao_arch_status_id,
      },
      {
        cbao_elec_status_id: app.cbao_elec_status_id,
      },
      {
        cbao_san_status_id: app.cbao_san_status_id,
      },
      {
        cbao_lg_status_id: app.cbao_lg_status_id,
      },
      {
        cbao_str_status_id: app.cbao_str_status_id,
      },
      {
        cbao_mec_status_id: app.cbao_mec_status_id,
      },
    ];
    status.forEach((tech) => {
      if (tech.cbao_arch_status_id == 2) {
        const body = {
          cbao_arch_status_id: 0,
        };
        this.updateTechnicalEvaluationStatus(body);
      } else if (tech.cbao_elec_status_id == 2) {
        const body = {
          cbao_elec_status_id: 0,
        };
        this.updateTechnicalEvaluationStatus(body);
      } else if (tech.cbao_san_status_id == 2) {
        const body = {
          cbao_san_status_id: 0,
        };
        this.updateTechnicalEvaluationStatus(body);
      } else if (tech.cbao_lg_status_id == 2) {
        const body = {
          cbao_lg_status_id: 0,
        };
        this.updateTechnicalEvaluationStatus(body);
      } else if (tech.cbao_str_status_id == 2) {
        const body = {
          cbao_str_status_id: 0,
        };
        this.updateTechnicalEvaluationStatus(body);
      } else if (tech.cbao_mec_status_id == 2) {
        const body = {
          cbao_mec_status_id: 0,
        };
        this.updateTechnicalEvaluationStatus(body);
      }
    });
  }
  updateTechnicalEvaluationStatus(body) {
    this.applicationService
      .updateCbaoStatus(body, this.applicationId)
      .subscribe((res) => {
        this.openSnackBar('Success!');
      });
  }

  updateApplication(body) {
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        Swal.fire('Success!', `Forwarded for Re-Evaluation!`, 'success').then(
          (result) => {
            this.isLoading = false;
            window.location.reload();
          }
        );
      });
  }

  checkDepartmentNonCompliant() {
    //checks if one department status is noncompoliant
    const app = this.applicationDetails;
    const status = [
      {
        id: app.parallel_cepmo_status_id,
      },
      {
        id: app.parallel_bfp_status_id,
      },
      {
        id: app.parallel_cbao_status_id,
      },
    ];
    const isNonCompliant = status.find((dep) => dep.id == 2);
    return isNonCompliant;
  }

  openFormDialog(element): void {
    if (element.document_status_id == 1) {
      Swal.fire({
        title: 'Document is compliant',
        text: '',
        icon: 'info',
      });
    } else if (this.applicationDetails.application_status_id !== 5) {
      Swal.fire({
        title: 'Application is still being evaluated',
        text: 'Please edit the file if the status of your application is "For Compliance".',
        icon: 'info',
        imageUrl: '../../../assets/status-for-compliance.png',
      });
    } else {
      const dialogRef = this.dialog.open(FormDetailsComponent, {
        width: '1500px',
        height: '2000px',
        data: {
          evaluator: this.evaluatorDetails,
          form: element,
          route: this.route,
          application: this.applicationDetails,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (this.viewNonCompliant.value !== true) {
          this.ngOnInit();
        } else {
          this.isLoading = true;
          this.applicationService
            .fetchUserDocs(this.applicationId)
            .subscribe((result) => {
              if (
                this.applicationDetails.is_amendment == 2 &&
                this.applicationDetails.permit_type_id == 2
              ) {
                let filter = result.data.filter((e) => e.is_duplicate == 1);
                let bfpCepmoDocs = result.data.filter(
                  (e) => e.is_duplicate !== 1 && e.document_status_id == 2
                );
                filter.push(...bfpCepmoDocs);
                filter = filter.filter((e) => e.document_status_id == 2);
                this.sortUserDocs(filter);
              } else {
                this.sortUserDocs(
                  result.data.filter((e) => e.document_status_id == 2)
                );
              }
              this.unfilteredData = result.data;
            });
        }
      });
    }
  }

  openRemarksHistory(e) {
    const dialogRef = this.dialog.open(RemarksHistoryTableComponent, {
      width: '1000px',
      height: '800px',
      data: {
        evaluator: this.evaluatorDetails,
        form: e,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  otherPermitsSave() {
    if (!this.checkFormNonCompliant()) {
      this.isLoading = true;
      if (this.applicationDetails.receiving_status_id == 2) {
        const body = {
          application_status_id: 1,
          receiving_status_id: 0,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CBAO Receiving for Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else if (this.applicationDetails.cbao_status_id == 2) {
        //other permits
        const body = {
          application_status_id: 18,
          cbao_status_id: 0,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CBAO for Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else if (this.applicationDetails.dc_status_id == 2) {
        const body = {
          application_status_id: 18,
          dc_status_id: 0,
        };
        this.updateTechnicalEvaluatorStatus();
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to Technical Evaluators for Re-Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else if (this.applicationDetails.bo_status_id == 2) {
        const body = {
          application_status_id: 13,
          bo_status_id: 0,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to Building Official for Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      }
    } else {
      this.openSnackBar('Please review non-compliant document!');
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  fetchApplicationInspections() {
    this.inspectionService
      .getApplicationInspections(this.applicationId)
      .subscribe((res) => {
        this.inspections = res.data;
        console.log(this.inspections);
      });
  }

  viewInspection(inspection) {
    const dialogRef = this.dialog.open(InspectionDetailsComponent, {
      data: {
        inspection: inspection,
      },
    });
    const sub = dialogRef.componentInstance.onClose.subscribe(() => {
      this.fetchApplicationInspections();
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getReminder() {
    let status = this.applicationDetails.application_status_id;
    let evaluation = [1, 2, 3, 12, 13, 18];
    if (status == 5) {
      return 'Please edit your files now!';
    } else if (evaluation.find((e) => e == status)) {
      return 'Your application is being evaluated as of the moment. You can not edit any document submitted until the status turns to "For Compliance"';
    } else if (status == 8) {
      return 'Please check your fees and pay at the CBAO and check your email for the instructions in printing your documents.';
    } else if (status == 4) {
      return 'Visit CBAO together with the printed, signed and sealed documents and claim your permit.';
    }
  }
}
