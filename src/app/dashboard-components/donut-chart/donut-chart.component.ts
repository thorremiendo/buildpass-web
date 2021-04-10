import { Component, OnInit, ViewChild, Input} from '@angular/core';
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
  @Input() pending: number;
  @Input() current: number;
  @Input() completed: number;
  @Input() hello;

  public date = new Date;
  public loading:boolean = true;

  @ViewChild('donut-chart') chart2: ChartComponent = Object.create(null);
  public DonutChartOptions;

  constructor() {
  
  
  }

  ngOnInit(): void {
    this.DonutChartOptions = {
      series: [this.pending, this.current, this.completed],
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
      labels: [ 'Pending', 'Current', 'Completed'],
      colors: ['#F2BA49', '#FF8C00', '#800000'],
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

  displayData(){
    
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
