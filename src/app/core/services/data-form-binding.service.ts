import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { Injectable } from '@angular/core';
import * as NumberToWords from 'number-to-words';

@Injectable({
  providedIn: 'root',
})
export class DataFormBindingService {
  public applicationInfo;
  public applicationId;
  public projectDetails;
  public applicantDetails;
  public representativeDetails;

  constructor() {}

  //FIRE SAFETY EVALUATION CLEARANCE
  getFireClearanceData(a) {
    const applicantDetails = a.applicant_detail;
    const projectDetails = a.project_detail;
    const representativeDetails = a.representative_detail;

    const formData = {
      building_name:
        projectDetails.project_title == 'undefined'
          ? 'N/A'
          : projectDetails.project_title.toUpperCase(),
      address:
        projectDetails.barangay == 'undefined'
          ? 'N/A'
          : projectDetails.barangay.toUpperCase(),
      owner_name: `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
    };

    return formData;
  }

  //BUILDING PERMIT CERTIFICATE
  getBuildingCertificateData(a) {
    const applicantDetails = a.applicant_detail;
    const projectDetails = a.project_detail;
    const representativeDetails = a.representative_detail;
    const projectCostCap = parseFloat(
      a.project_detail.project_cost_cap
    ).toLocaleString();

    const formData = {
      owner_permitee: `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      project_title:
        projectDetails.project_title == 'undefined'
          ? 'N/A'
          : projectDetails.project_title.toUpperCase(),
      lot:
        projectDetails.lot_number == 'undefined'
          ? 'N/A'
          : projectDetails.lot_number,
      block:
        projectDetails.block_number == 'undefined'
          ? 'N/A'
          : projectDetails.block_number,
      tct_no:
        projectDetails.tct_number == 'undefined'
          ? 'N/A'
          : projectDetails.tct_number,
      street:
        projectDetails.street_name == 'undefined'
          ? 'N/A'
          : projectDetails.street_name.toUpperCase(),
      brgy:
        projectDetails.barangay == 'undefined'
          ? 'N/A'
          : projectDetails.barangay.toUpperCase(),
      city: 'BAGUIO CITY',
      zip_code: '2600',
      project_cost: projectCostCap,
    };

    return formData;
  }

  //WWMS BP CERTIFICATE
  getWwmsData(a) {
    const applicantDetails = a.applicant_detail;
    const projectDetails = a.project_detail;
    const representativeDetails = a.representative_detail;

    const formData = {
      project_name:
        projectDetails.project_title == 'undefined'
          ? 'N/A'
          : projectDetails.project_title.toUpperCase(),
      building_address:
        projectDetails.lot_number == 'undefined'
          ? 'N/A'
          : projectDetails.lot_number,
      street_no:
        projectDetails.street_name == 'undefined'
          ? 'N/A'
          : projectDetails.street_name.toUpperCase(),
      street_name:
        projectDetails.street_name == 'undefined'
          ? 'N/A'
          : projectDetails.street_name.toUpperCase(),
      brgy_name:
        projectDetails.barangay == 'undefined'
          ? 'N/A'
          : projectDetails.barangay.toUpperCase(),
      business_owner: `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      owner_address: `${applicantDetails.house_number} ${applicantDetails.street_name} ${applicantDetails.barangay}`.toUpperCase(),
      contact_no:
        applicantDetails.contact_number == 'undefined'
          ? 'N/A'
          : applicantDetails.contact_number,
    };

    return formData;
  }

  //GENERTAL FORM DATA
  getFormData(a) {
    const applicantDetails = a.applicant_detail;
    const projectDetails = a.project_detail;
    const representativeDetails = a.representative_detail;
    const projectCostCap = parseFloat(
      a.project_detail.project_cost_cap
    ).toLocaleString();

    const formData = {
      applicant_full_name: `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      applicant_first_name:
        applicantDetails.first_name == 'undefined'
          ? 'N/A'
          : applicantDetails.first_name.toUpperCase(),
      applicant_last_name:
        applicantDetails.last_name == 'undefined'
          ? 'N/A'
          : applicantDetails.last_name.toUpperCase(),
      applicant_middle_name:
        applicantDetails.middle_name == 'undefined'
          ? 'N/A'
          : applicantDetails.middle_name.toUpperCase(),
      applicant_suffix_name:
        applicantDetails.suffix_name == 'na'
          ? ' '
          : applicantDetails.suffix_name.toUpperCase(),
      applicant_tin_number:
        applicantDetails.tin_number == 'undefined'
          ? 'N/A'
          : applicantDetails.tin_number,
      applicant_contact_number:
        applicantDetails.contact_number == 'undefined'
          ? 'N/A'
          : applicantDetails.contact_number,
      applicant_email_address:
        applicantDetails.email_address == 'undefined'
          ? 'N/A'
          : applicantDetails.email_address.toUpperCase(),
      applicant_house_number:
        applicantDetails.house_number == 'undefined'
          ? 'N/A'
          : applicantDetails.house_number.toUpperCase(),
      applicant_unit_number:
        applicantDetails.unit_number == 'undefined'
          ? 'N/A'
          : applicantDetails.unit_number,
      applicant_floor_number:
        applicantDetails.floor_number == 'undefined'
          ? 'N/A'
          : applicantDetails.floor_number,
      applicant_street_name:
        applicantDetails.street_name == 'undefined'
          ? 'N/A'
          : applicantDetails.street_name.toUpperCase(),
      applicant_barangay:
        applicantDetails.barangay == 'undefined'
          ? 'N/A'
          : applicantDetails.barangay.toUpperCase(),
      applicant_province: 'BENGUET',
      applicant_city: 'BAGUIO CITY',
      appicant_zipcode: '2600',
      project_house_number:
        projectDetails.house_number == 'undefined'
          ? 'N/A'
          : projectDetails.house_number,
      project_lot_number:
        projectDetails.lot_number == 'undefined'
          ? 'N/A'
          : projectDetails.lot_number,
      project_block_number:
        projectDetails.block_number == 'undefined'
          ? 'N/A'
          : projectDetails.block_number,
      project_street_name:
        projectDetails.street_name == 'undefined'
          ? 'N/A'
          : projectDetails.street_name.toUpperCase(),
      project_number_of_units:
        projectDetails.number_of_units == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_units,
      project_barangay:
        projectDetails.barangay == 'undefined'
          ? 'N/A'
          : projectDetails.barangay.toUpperCase(),
      project_number_of_basement:
        projectDetails.number_of_basement == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_basement,
      project_lot_area:
        projectDetails.lot_area == 'undefined'
          ? 'N/A'
          : projectDetails.lot_area,
      project_total_floor_area:
        projectDetails.total_floor_area == 'undefined'
          ? 'N/A'
          : projectDetails.total_floor_area,
      project_units:
        projectDetails.number_of_units == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_units,
      project_number_of_storey:
        projectDetails.number_of_storey == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_storey,
      project_type:
        projectDetails.project_title == 'undefined'
          ? 'N/A'
          : projectDetails.project_title.toUpperCase(),
      project_cost_cap:
        projectCostCap == 'undefined' ? 'N/A' : `${projectCostCap}.00`,
      project_tct_number:
        projectDetails.tct_number == 'undefined'
          ? 'N/A'
          : projectDetails.tct_number,
      project_tax_dec_number:
        projectDetails.tax_dec_number == 'undefined'
          ? 'N/A'
          : projectDetails.tax_dec_number,
      project_province: 'BENGUET',
      project_city: 'BAGUIO CITY',
      project_zipcode: '2600',
      project_complete_address: `${projectDetails.house_number} ${projectDetails.lot_number} ${projectDetails.street_name} ${projectDetails.barangay}`.toUpperCase(),

      amount_in_words:
        projectDetails.project_cost_cap == 'undefined'
          ? 0
          : `${NumberToWords.toWords(
              projectDetails.project_cost_cap == 'undefined'
                ? 0
                : projectDetails.project_cost_cap
            ).toUpperCase()} PESOS`,
      rep_first_name:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.first_name.toUpperCase(),
      rep_last_name:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.last_name.toUpperCase(),
      rep_middle_name:
        representativeDetails == null || representativeDetails.middle_name == ''
          ? 'N/A'
          : representativeDetails.middle_name.toUpperCase(),
      rep_suffix_name:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.suffix_name,
      rep_house_number:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.house_number,
      rep_street_name:
        representativeDetails == null || representativeDetails.street_name == ''
          ? 'N/A'
          : representativeDetails.street_name.toUpperCase(),
      rep_barangay:
        representativeDetails == null ? 'N/A' : representativeDetails.barangay,
      rep_contact_number:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.contact_number,
      rep_province: 'BENGUET',
      rep_city: 'BAGUIO CITY',
      rep_zipcode: '2600',
      name_of_corporation: 'N/A',
      corporation_contact_number: 'N/A',
      corporation_address_no: 'N/A',
      corporation_address_barangay: ' N/A',
      corporation_address_city: 'N/A',
      //TODO: data binding
      existing_land_others: 'N/A',
      position_title: 'N/A',
      right_over_land_others: 'N/A',
      project_tenure_temporary: 'N/A',
      project_nature_others: 'N/A',
    };
    return formData;
  }
}
