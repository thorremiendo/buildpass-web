import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advance-pie-chart',
  templateUrl: './advance-pie-chart.component.html',
  styleUrls: ['./advance-pie-chart.component.scss']
})
export class AdvancePieChartComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
