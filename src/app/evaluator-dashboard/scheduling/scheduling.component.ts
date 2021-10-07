import { Router } from '@angular/router';
import { SchedulingService } from './../../core/services/scheduling.service';
import { AddInspectionComponent } from './../add-inspection/add-inspection.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent implements OnInit {
  selected: Date | null;
  public currentDate = new Date();
  public selectedDate;
  public init = new Date();
  public model = [];
  public inspections = [];
  public displayInspections = [];
  public evaluatorDetails;
  public user;
  public isLoading: boolean = false;
  public inspectionsToday = [];
  public inspectionsUpcoming = [];
  constructor(
    public dialog: MatDialog,
    private inspectionService: SchedulingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    this.inspectionService
      .getEvaluatorInspections(this.evaluatorDetails.user_id)
      .subscribe((res) => {
        this.inspections = res.data ? res.data : '1';
        console.log(this.inspections);
        this.inspections.forEach((element) => {
          this.model.push(new Date(element.scheduled_date));
        });
        this.inspectionsToday = this.inspections.filter(
          (e) =>
            this.dateToString(e.scheduled_date) ==
            this.dateToString(this.currentDate)
        );
        this.inspectionsUpcoming = this.inspections.filter(
          (e) =>
            this.dateToString(e.scheduled_date) !==
            this.dateToString(this.currentDate)
        );
        this.isLoading = false;
      });
  }

  onSelect(event) {
    this.selectedDate = this.dateToString(event);
    if (this.selectedDate !== this.dateToString(this.currentDate)) {
      this.inspectionsToday = this.inspections.filter(
        (e) => this.dateToString(e.scheduled_date) == this.selectedDate
      );
    } else {
      this.inspectionsToday = this.inspections.filter(
        (e) =>
          this.dateToString(e.scheduled_date) ==
          this.dateToString(this.currentDate)
      );
    }
  }

  dateClass = (date: Date) => {
    if (this.findDate(date) !== -1) {
      return ['selected'];
    }
    return [];
  };

  findDate(date: Date): number {
    return this.model.map((m) => +m).indexOf(+date);
  }

  dateToString(dateObject) {
    var d = new Date(dateObject),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  goToApplication(id) {
    console.log(id);
    this.router.navigate(['evaluator/application', id]);
  }
}
