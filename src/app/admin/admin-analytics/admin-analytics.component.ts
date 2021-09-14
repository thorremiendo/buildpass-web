import { Component, OnInit } from '@angular/core';
import { AdminService, WaterMarkService } from '../../core';
import { applicationStatusData, applicationType } from './chart-data';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss'],
})
export class AdminAnalyticsComponent implements OnInit {
  private testDoc: string =
    //'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/bldg-permit-certificate.pdf';
    //'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/Certificate-of-Zoning-Compliance-Form-BLANK-FORM.doc.pdf';
    // 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/fsec.pdf';
    // 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/wwms.pdf';
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/checklist_for_building.pdf';

  private doc_type: string =
    //'building-permit';
    //'zoning-permit';
    //'fire-permit';
    //'wwms-permit';
    'checklist-bldg';
  public applicationStatusData:any;;
  public permitType:any;;
  public date = new Date();
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Total';
  showYAxisLabel = true;
  yAxisLabel = 'Permit Type';
  showGridLines = true;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 8;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;
  rangeFillOpacity = 0.15;

  colorScheme = {
    domain: ['#4fc3f7', '#fb8c00', '#7460ee', '#f62d51', '#20c997', '#2962FF']
  };

  schemeType = 'ordinal';

  private id = 1;
  constructor(
    private watermark: WaterMarkService,
    private adminService: AdminService,
    ) {}

  ngOnInit(): void {
    this.fetchDataForAnalytics();
  }

  select(data: string): void {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry: string): void {
    console.log('Legend clicked', entry);
  }

  compliant() {
    this.watermark.generateQrCode(this.id).subscribe((res) => {
      this.watermark.insertQrCode(this.testDoc, res.data, this.doc_type);
    });
  }

  noncompliant() {
    this.watermark
      .insertWaterMark(this.testDoc, 'non-compliant')
      .then((blob) => {});
  }

  fetchDataForAnalytics(){
    console.log("click");

    this.adminService.fetchApplicationTotalStatus().subscribe( data => {
      this.applicationStatusData = data.data;
    });

    this.adminService.fetchTotalPermitByType().subscribe( data => {
      this.permitType = data.data;
    })

  }


}
