import { Component, OnInit } from '@angular/core';
import { WaterMarkService } from '../../core';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss'],
})
export class AdminAnalyticsComponent implements OnInit {
  private testDoc: string =
    //'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/bldg-permit-certificate.pdf';
   'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/Certificate-of-Zoning-Compliance-Form-BLANK-FORM.doc.pdf';
  // 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/fsec.pdf';
  //'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/wwms.pdf'
  private doc_type: string = 
    //'building-permit';
    //'zoning-permit';
    'zoning-permit';

  private id = 1
  constructor(private watermark: WaterMarkService) {}

  ngOnInit(): void {}

  compliant() {
    // this.watermark.insertWaterMark(this.testDoc, 'compliant').then((blob) => {
    //   console.log(blob);
    // });

    this.watermark.generateQrCode(this.id).subscribe(res =>{
      this.watermark.insertQrCode(this.testDoc, res.data, this.doc_type)
      console.log(res.data)
    })
  }

  noncompliant() {
    this.watermark.insertWaterMark(this.testDoc, 'non-compliant').then((blob) => {
      console.log(blob);
    });
  }
}
