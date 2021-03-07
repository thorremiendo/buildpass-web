import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive
} from 'ng-apexcharts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  public date = new Date;

  @ViewChild('donut-chart') chart2: ChartComponent = Object.create(null);
  public DonutChartOptions: Partial<DonutChartOptions>;

  constructor() {
    this.DonutChartOptions = {
      series: [4, 15, 27, 18],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 230
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80px'
          }
        }
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0
      },
      legend: {
        show: false,
      },
      labels: ['New Task', 'Opened Task', 'Closed Task', 'Applicants'],
      colors: ['#955670', '#275070', '#EBAAB0', '#F3E1C0'],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
  }

}

export interface DonutChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}
