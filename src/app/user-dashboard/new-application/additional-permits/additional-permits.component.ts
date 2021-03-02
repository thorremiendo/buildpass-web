import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-additional-permits',
  templateUrl: './additional-permits.component.html',
  styleUrls: ['./additional-permits.component.scss'],
})
export class AdditionalPermitsComponent implements OnInit {
  public additionalPermits = [
    { id: '1', name: 'Excavation Permit' },
    { id: '2', name: 'Demolition Permit' },
    { id: '3', name: 'Fencing Permit' },
  ];
  public selectedAdditionalPermits: string[];
  public applicationInfo;
  constructor(
    private router: Router,
    private newApplicationService: NewApplicationFormService
  ) {}

  ngOnInit(): void {
    this.selectedAdditionalPermits = new Array<string>();
    this.newApplicationService.newApplicationSubject
    .asObservable()
    .subscribe(
      (newApplicationSubject) =>
        (this.applicationInfo = newApplicationSubject)
    );
  }
  getPermitId(event: any, id: string) {
    if (event.target.checked) {
      this.selectedAdditionalPermits.push(id);
    } else {
      this.selectedAdditionalPermits = this.selectedAdditionalPermits.filter(
        (m) => m != id
      );
    }
    console.log(this.selectedAdditionalPermits);
  }
  handleProceed(){
    const value = this.applicationInfo
    const body = {
      application_type: value.application_type,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      construction_status: value.construction_status,
      registered_owner: value.registered_owner,
      additional_permits: this.selectedAdditionalPermits
    };
    this.newApplicationService.setApplicationInfo(body)
    this.router.navigateByUrl('dashboard/new/step-two/lot-owner')
  }
}
