import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-design-analysis-forms',
  templateUrl: './design-analysis-forms.component.html',
  styleUrls: ['./design-analysis-forms.component.scss'],
})
export class DesignAnalysisFormsComponent implements OnInit {
  public buildingPlans: File;
  public structuralDesign: File;
  public electricalDesign: File;
  public soilAnalysis: File;

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
    console.log(this.applicationInfo);
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'buildingPlans':
        this.buildingPlans = file;
        break;
      case 'structuralDesign':
        this.structuralDesign = file;
        break;
      case 'electricalDesign':
        this.electricalDesign = file;
        break;
      case 'soilAnalysis':
        this.soilAnalysis = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'buildingPlans':
        this.buildingPlans = null;
        break;
      case 'structuralDesign':
        this.structuralDesign = null;
        break;
      case 'electricalDesign':
        this.electricalDesign = null;
        break;
      case 'soilAnalysis':
        this.soilAnalysis = null;
        break;
    }
  }
  callNext() {
    const value = this.applicationInfo
    const body = {
      application_type: value.application_type,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      filing_fee_receipt: value.filing_fee_receipt,
      zoning_clearance_form: value.zoning_clearance_form,
      special_power_of_attorney: value.special_power_of_attorney,
      true_copy_of_title: value.true_copy_of_title,
      contract_of_lease: value.contract_of_lease,
      tax_declaration: value.tax_declaration,
      real_property_tax_receipt: value.real_property_tax_receipt,
      latest_picture_of_site: value.latest_picture_of_site,
      building_permit_form: value.building_permit_form,
      sanitary_permit_form: value.sanitary_permit_form,
      electrical_permit_form: value.electrical_permit_form
    }
    if(this.buildingPlans) {
      body["building_plan"] = this.buildingPlans
    }
    if(this.structuralDesign) {
      body["structural_design"] = this.structuralDesign
    }
    if(this.electricalDesign) {
      body["electrical_design"] = this.electricalDesign
    }
    if(this.soilAnalysis) {
      body["soil_analaysis"] = this.soilAnalysis
    }
    this.newApplicationService.setApplicationInfo(body)
    this.router.navigateByUrl('/dashboard/new/professional-details');
  }
}
