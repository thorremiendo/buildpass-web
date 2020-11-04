import { Component, OnInit } from '@angular/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checklist-summary',
  templateUrl: './checklist-summary.component.html',
  styleUrls: ['./checklist-summary.component.scss'],
})
export class ChecklistSummaryComponent implements OnInit {
  public applicationInfo;

  constructor(
    private newApplicationService: NewApplicationFormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newApplicationService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationInfo = newApplicationSubject)
      );
  }

  submit(){
    this.router.navigateByUrl('dashboard/new/success')
  }
}
