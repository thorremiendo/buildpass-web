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

export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    grid: ApexGrid;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

    @ViewChild('chart') chart: ChartComponent = Object.create(null);
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: 'Building Permit',
                    data: [44, 55, 57, 56, 61, 58],
                    color: '#400001',
                },
                {
                    name: 'Other Permit',
                    data: [76, 85, 101, 98, 87, 105],
                    color: '#6d0303'
                },
              
                
            ],
            chart: {
                type: 'bar',
                fontFamily: 'Poppins,sans-serif',
                height: 347
            },
            grid: {
                borderColor: 'rgba(0,0,0,.2)',
                strokeDashArray: 3,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '30%',
                    endingShape: 'flat'
                },

            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: [
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul'
                ]
            },

            legend: {
                show: false,
            },
            fill: {
                colors: ['#400001', '#6d0303'],
                opacity: 1
            },
            tooltip: {
                theme: 'light',
                fillSeriesColor: false,
                marker: {
                    show: false,
                },
            }
        };
    }

    ngOnInit(): void {
    }

}






