import { Component, OnInit } from '@angular/core';
import { WaterMarkService } from '../../core';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss'],
})
export class AdminAnalyticsComponent implements OnInit {
  private testDoc: string =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/00ffVt9AieMdBvAHnkryNXsWMBPTgQAMim5RYtaB.pdf';
  private doc_type: string = 'non-compliant';
  constructor(private watermark: WaterMarkService) {}

  ngOnInit(): void {}

  compliant() {
    this.watermark.modifyPdf(this.testDoc, 'compliant').then((blob) => {
      console.log(blob);
    });
  }

  noncompliant() {
    this.watermark.modifyPdf(this.testDoc, 'non-compliant').then((blob) => {
      console.log(blob);
    });
  }
}
