import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AdminService } from '../../core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import ApexCharts from 'apexcharts';
import { saveAs } from 'file-saver';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'app-admin-application-list',
  templateUrl: './admin-application-list.component.html',
  styleUrls: ['./admin-application-list.component.scss'],
})
export class AdminApplicationListComponent implements OnInit {
  @ViewChild('filtersTemplate', {static: true}) filtersTemplate: TemplateRef<any>;
  private userInfo;
  public userName;
  public applications;
  public applicationCount;
  public applicationStats;
  public viewDate = new Date();
  public totalApplicationCount = null;
  public evaluationApplicationCount = 0;
  public complianceApplicationCount = 0;
  public reevaluationApplicationCount = 0;
  public searchKey = new FormControl('');
  public permitType = new FormControl('0');
  public applicationStatus = new FormControl('0');
  public applicationStatusValue = [1, 2, 10, 3, 18, 12, 13, 4, 8];
  public complianceStatus = new FormControl('1');
  public dateStart = new FormControl('');
  public dateEnd = new FormControl('');
  public pageIndex = 0;
  public pageSize = 5;
  public filterCount = 1;
  public loading: boolean = false;
  private dialog;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    if (this.userInfo) {
      this.userName = this.userInfo.first_name;
      this.fetchApplications();
      this.fetchApplicationStats();

      this.searchKey.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.permitType.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.applicationStatus.valueChanges.subscribe((res) => {
        this.setApplicationStatus(res);
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.complianceStatus.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });
  
      this.dateStart.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });
  
      this.dateEnd.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });
    }
  }

  getFilterCount() {
    let filterCount = 0;
    if (Number(this.permitType.value)) filterCount++;
    if (Number(this.applicationStatus.value)) filterCount++;
    if (Number(this.complianceStatus.value)) filterCount++;
    if (Number(this.dateStart.value)) filterCount++;
    if (Number(this.dateEnd.value)) filterCount++;

    this.filterCount = filterCount;
  }

  clearFilters() {
    this.permitType.setValue('0');
    this.applicationStatus.setValue('0');
    this.dateStart.setValue(null);
    this.dateEnd.setValue(null);
  }

  openFilters() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "auto";
    dialogConfig.width = "700px";

    this.dialog = this.matDialog.open(this.filtersTemplate, dialogConfig);
    this.dialog.afterClosed().subscribe(result => {
      this.router.navigate([{outlets: {modal: null}}], {relativeTo: this.route.parent});
    });
  }

  closeFilters() {
    this.dialog.close();
  }

  setApplicationStatus(status) {
    switch(status) {
      case '0':
        this.applicationStatusValue = [1, 2, 10, 3, 18, 12, 13, 4, 8];
        break;
      case '1':
        this.applicationStatusValue = [1];
        break;
      case '2':
        this.applicationStatusValue = [2, 10];
        break;
      case '3':
        this.applicationStatusValue = [3, 18];
        break;
      case '4':
        this.applicationStatusValue = [12];
        break;
      case '5':
        this.applicationStatusValue = [13];
        break;
      case '6':
        this.applicationStatusValue = [4, 8];
        break;
      case '7':
        this.applicationStatusValue = [11];
        break;
      case '8':
        this.applicationStatusValue = [6, 9];
        break;
    }
  }

  fetchApplications() {
    this.loading = true;
    const params = {
      searchKey: this.searchKey.value ? this.searchKey.value : '',
      permitType: this.permitType.value ? this.permitType.value : '',
      applicationStatus: this.applicationStatusValue ? this.applicationStatusValue : '',
      reevaluationStatus: null,
      isReevaluationStatus: null,
      dateStart: this.dateStart.value ? moment( this.dateStart.value).format('YYYY-MM-DD') : '',
      dateEnd: this.dateEnd.value ? moment( this.dateEnd.value).format('YYYY-MM-DD') : '',
      pageIndex: this.pageIndex + 1,
      pageSize: this.pageSize,
      incompleteFlag: this.applicationStatus.value == '8' ? 1 : '',
    }

    let countParams = {...params};
    this.adminService.fetchApplications(countParams).subscribe((data) => {
      this.evaluationApplicationCount = data.total;
    });

    countParams.isReevaluationStatus = '1';
    this.adminService.fetchApplications(countParams).subscribe((data) => {
      this.reevaluationApplicationCount = data.total;
    });

    countParams.reevaluationStatus = countParams.applicationStatus;
    countParams.applicationStatus = [5];
    countParams.isReevaluationStatus = '0';
    this.adminService.fetchApplications(countParams).subscribe((data) => {
      this.complianceApplicationCount = data.total;
    });

    if (this.complianceStatus.value == '2') {
      params.reevaluationStatus = params.applicationStatus;
      params.applicationStatus = [5];
    } else if (this.complianceStatus.value == '3') {
      params.isReevaluationStatus = '1';
    }
    this.adminService.fetchApplications(params).subscribe((data) => {
      this.applications = this.applicationModifications(data.data);
      this.applicationCount = data.total;
      this.loading = false;
    });
  }

  applicationModifications(applications) {
    applications.forEach(application => {
      if (application.application_status_id == '5') {
        const temp = application.application_status_id;
        application.application_status_id = application.reevaluation_status_id;
        application.reevaluation_status_id = temp;
      }
    });

    return applications;
  }

  fetchApplicationStats() {
    this.adminService.fetchApplicationTotalStatus().subscribe((data) => {
      this.applicationStats = data.data;

      let count = 0;
      for (let i=0; i<10; i++) {
        count += this.applicationStats[i].value;
      }
      this.evaluationApplicationCount = count;
      this.complianceApplicationCount = this.applicationStats[12].value;

      if (this.totalApplicationCount == null) this.totalApplicationCount = count;
      
      this.initChart();
    });
  }

  initChart() {
    const chartOptions = {
      series: [
        this.applicationStats[0].value,
        this.applicationStats[1].value + this.applicationStats[2].value,
        this.applicationStats[3].value + this.applicationStats[4].value,
        this.applicationStats[5].value,
        this.applicationStats[6].value,
        this.applicationStats[7].value + this.applicationStats[8].value + this.applicationStats[9].value + this.applicationStats[10].value,
      ],
      labels: [
        'Receiving',
        'CPDO Evaluation',
        'CEPMO, BFP, CBAO Technical Evaluation',
        'CBAO Division Chief Evaluation',
        'Building Official Evaluation',
        'Releasing',
      ],
      colors: [
        '#FFFF00',
        '#FFA500',
        '#FF0000',
        '#800080',
        '#0000FF',
        '#008000',
      ],
      chart: {
        type: 'donut',
        height: '100%',
        width: '100%',
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      states: {
        hover: {
          filter: {
              type: 'none',
          }
        },
        active: {
          filter: {
            type: 'none',
          }
        },
      },
    };
    const chartContainer = document.getElementById('task-chart');
    const taskChart = new ApexCharts(chartContainer, chartOptions);
    taskChart.render();
  }

  changeIndex(index) {
    this.pageIndex = index;
    this.fetchApplications();
  }

  viewApplication(id) {
    this.router.navigate(['evaluator/application', id]);
  }

  exportResults() {
    const data = [];
    this.applications.forEach(application => {
      data.push({
        permit_application_code: application.permit_application_code,
        ...application.applicant_detail,
        ...application.project_detail,
      });
    });
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "export.csv");
  }
}
