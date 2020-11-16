import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-initial-forms',
  templateUrl: './initial-forms.component.html',
  styleUrls: ['./initial-forms.component.scss'],
})
export class InitialFormsComponent implements OnInit {

  public filingFeeReceipt: File;
  public zoningClearanceForm: File;
  public specialPowerOfAttorney: File;
  public trueCopyOfTitle: File;
  public contractOfLease: File;
  public taxDeclaration: File;
  public realPropertyTaxReceipt: File;
  public latestPictureOfSite: File;

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
      case 'filingFeeReceipt':
        this.filingFeeReceipt = file;
        break;
      case 'zoningClearanceForm':
        this.zoningClearanceForm = file;
        break;
      case 'specialPowerOfAttorney':
        this.specialPowerOfAttorney = file;
        break;
      case 'trueCopyOfTitle':
        this.trueCopyOfTitle = file;
        break;
      case 'contractOfLease':
        this.contractOfLease = file;
        break;
      case 'taxDeclaration':
        this.taxDeclaration = file;
        break;
      case 'realPropertyTaxReceipt':
        this.realPropertyTaxReceipt = file;
        break;
      case 'latestPictureOfSite':
        this.latestPictureOfSite = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'filingFeeReceipt':
        this.filingFeeReceipt = null;
        break;
      case 'zoningClearanceForm':
        this.zoningClearanceForm = null;
        break;
      case 'specialPowerOfAttorney':
        this.specialPowerOfAttorney = null;
        break;
      case 'trueCopyOfTitle':
        this.trueCopyOfTitle = null;
        break;
      case 'contractOfLease':
        this.contractOfLease = null;
        break;
      case 'taxDeclaration':
        this.taxDeclaration = null;
        break;
      case 'realPropertyTaxReceipt':
        this.realPropertyTaxReceipt = null;
        break;
      case 'latestPictureOfSite':
        this.latestPictureOfSite = null;
        break;
    }
  }
  callNext() {
    const body = {
      application_type: this.applicationInfo.application_type,
      is_representative: this.applicationInfo.is_representative,
      is_lot_owner: this.applicationInfo.is_lot_owner,
    }
    if(this.filingFeeReceipt) {
      body["filing_fee_receipt"] = this.filingFeeReceipt
    }
    if(this.zoningClearanceForm) {
      body["zoning_clearance_form"] = this.zoningClearanceForm
    }
    if(this.specialPowerOfAttorney) {
      body["special_power_of_attorney"] = this.specialPowerOfAttorney
    }
    if(this.trueCopyOfTitle) {
      body["true_copy_of_title"] = this.trueCopyOfTitle
    }
    if(this.contractOfLease) {
      body["contract_of_lease"] = this.contractOfLease
    }
    if(this.taxDeclaration) {
      body["tax_declaration"] = this.taxDeclaration
    }
    if(this.realPropertyTaxReceipt) {
      body["real_property_tax_receipt"] = this.realPropertyTaxReceipt
    }
    if(this.latestPictureOfSite) {
      body["latest_picture_of_site"] = this.latestPictureOfSite
    }
    this.newApplicationService.setApplicationInfo(body)
    this.router.navigateByUrl('/dashboard/new/building-permit-forms')
  }
}
