import { Component, OnInit } from '@angular/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-existing-applications',
  templateUrl: './existing-applications.component.html',
  styleUrls: ['./existing-applications.component.scss'],
})
export class ExistingApplicationsComponent implements OnInit {
  public columnsToDisplay: string[] = [
    'applicationNumber',
    'applicationDate',
    'applicationType',
    'applicationStatus',
    'action',
  ];
  public applicationInfoData;
  constructor(private newApplicationService: NewApplicationFormService) {}

  ngOnInit(): void {
    this.newApplicationService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationInfoData = newApplicationSubject)
      );
    console.log(this.applicationInfoData);
  }
}
