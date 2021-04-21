import { ApiService } from './api.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { Injectable } from '@angular/core';
import * as NumberToWords from 'number-to-words';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataFormBindingService {
  public applicationInfo;
  public applicationId;
  public projectDetails;
  public applicantDetails;
  public representativeDetails;

  constructor(private api: ApiService) {}

  submitZoningFormData(body, id) {
    const url = `/formdata/${id}/zoning`;
    return this.api.post(url, body);
  }
  fetchZoningFormData(id) {
    const url = `/formdata/${id}/zoning`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  submitBuildingFormData(body, id) {
    const url = `/formdata/${id}/building`;
    return this.api.post(url, body);
  }
  fetchBuildingFormData(id) {
    const url = `/formdata/${id}/building`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  submitSanitaryFormData(body, id) {
    const url = `/formdata/${id}/sanitary`;
    return this.api.post(url, body);
  }
  fetchSanitaryFormData(id) {
    const url = `/formdata/${id}/sanitary`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  submitElectricalFormData(body, id) {
    const url = `/formdata/${id}/electrical`;
    return this.api.post(url, body);
  }
  fetchElectricalFormData(id) {
    const url = `/formdata/${id}/electrical`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  submitExcavationFormData(body, id) {
    const url = `/formdata/${id}/excavation`;
    return this.api.post(url, body);
  }
  fetchExcavationFormData(id) {
    const url = `/formdata/${id}/excavation`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  handleSaveFormData(applicationId, formId, data) {
    debugger;
    switch (formId) {
      case 1:
        const zoningBody = {
          applicant_first_name: data.applicant_first_name
            ? data.applicant_first_name
            : '',
          applicant_middle_name: data.applicant_middle_name
            ? data.applicant_middle_name
            : '',
          applicant_last_name: data.applicant_last_name
            ? data.applicant_last_name
            : '',
          name_of_corporation: data.name_of_corporation
            ? data.name_of_corporation
            : '',
          corporation_contact_number: data.corporation_contact_number
            ? data.corporation_contact_number
            : '',
          applicant_house_number: data.applicant_house_number
            ? data.applicant_house_number
            : '',
          applicant_street_name: data.applicant_street_name
            ? data.applicant_street_name
            : '',
          applicant_barangay: data.applicant_barangay
            ? data.applicant_barangay
            : '',
          applicant_province: data.applicant_province
            ? data.applicant_province
            : '',
          corporation_address_no: data.corporation_address_no
            ? data.corporation_address_no
            : '',
          corporation_address_barangay: data.corporation_address_barangay
            ? data.corporation_address_barangay
            : '',
          corporation_address_city: data.corporation_address_city
            ? data.corporation_address_city
            : '',
          rep_first_name: data.rep_first_name ? data.rep_first_name : '',
          rep_middle_name: data.rep_middle_name ? data.rep_middle_name : '',
          rep_last_name: data.rep_last_name ? data.rep_last_name : '',
          rep_contact_number: data.rep_contact_number
            ? data.rep_contact_number
            : '',
          rep_house_number: data.rep_house_number ? data.rep_house_number : '',
          rep_street_name: data.rep_street_name ? data.rep_street_name : '',
          rep_barangay: data.rep_barangay ? data.rep_barangay : '',
          rep_province: data.rep_province ? data.rep_province : '',
          project_type: data.project_type ? data.project_type : '',
          project_nature: data.project_nature ? data.project_nature : '',
          project_nature_others: data.project_nature_others
            ? data.project_nature_others
            : '',
          project_house_number: data.project_house_number
            ? data.project_house_number
            : '',
          project_street_name: data.project_street_name
            ? data.project_street_name
            : '',
          project_barangay: data.project_barangay ? data.project_barangay : '',
          project_province: data.project_province ? data.project_province : '',
          project_lot_area: data.project_lot_area ? data.project_lot_area : '',
          project_total_floor_area: data.project_total_floor_area
            ? data.project_total_floor_area
            : '',
          right_over_land: data.right_over_land ? data.right_over_land : '',
          right_over_land_others: data.right_over_land_others
            ? data.right_over_land_others
            : '',
          project_tenure: data.project_tenure ? data.project_tenure : '',
          project_tenure_temporary: data.project_tenure_temporary
            ? data.project_tenure_temporary
            : '',
          project_cost_cap: data.project_cost_cap ? data.project_cost_cap : '',
          amount_in_words: data.amount_in_words ? data.amount_in_words : '',
          existing_land: data.existing_land ? data.existing_land : '',
          existing_land_residence: data.existing_land_residence
            ? data.existing_land_residence
            : '',
          existing_land_commercial: data.existing_land_commercial
            ? data.existing_land_commercial
            : '',
          existing_land_others: data.existing_land_others
            ? data.existing_land_others
            : '',
          applicant_full_name: data.applicant_full_name
            ? data.applicant_full_name
            : '',
          position_title: data.position_title ? data.position_title : '',
        };
        this.submitZoningFormData(
          zoningBody,
          applicationId
        ).subscribe((res) => {});
        break;
      case 2:
        const buildingPermitBody = {
          project_city: data.project_city,
          project_province: data.project_province,
          unified_application_form: data.unified_application_form,
          application_number: data.application_number,
          area_number: data.area_number,
          // BOX 1
          applicant_last_name: data.applicant_last_name,
          applicant_first_name: data.applicant_first_name,
          applicant_middle_name: data.applicant_middle_name,
          form_of_ownership: data.form_of_ownership,
          applicant_tin_number: data.applicant_tin_number,
          for_construction: data.for_construction,
          applicant_house_number: data.applicant_house_number,
          applicant_street_name: data.applicant_street_name,
          applicant_barangay: data.applicant_barangay,
          applicant_city: data.applicant_city,
          applicant_zip_code: data.applicant_zip_code,
          applicant_contact_number: data.applicant_contact_number,
          project_lot_number: data.project_lot_number,
          project_block_number: data.project_block_number,
          project_tct_number: data.project_tct_number,
          project_tax_dec_number: data.project_tax_dec_number,
          project_street_name: data.project_street_name,
          project_barangay: data.project_barangay,
          // SCOPE OF WORK
          scope_of_work: data.scope_of_work,
          scope_of_work_raising: data.scope_of_work_raising,
          scope_of_work_accesory: data.scope_of_work_accesory,
          scope_of_work_legalization: data.scope_of_work_legalization,
          scope_of_work_others: data.scope_of_work_others,
          // CHARACTER OF OCCUPANCY
          character_of_occupancy: data.character_of_occupancy,
          group_a: data.group_a,
          group_a_others: data.group_a_others,
          group_b: data.group_b,
          group_b_others: data.group_b_others,
          group_c: data.group_c,
          group_c_others: data.group_c_others,
          group_d: data.group_d,
          group_d_others: data.group_d_others,
          group_e: data.group_e,
          group_e_others: data.group_e_others,
          group_f: data.group_f,
          group_f_others: data.group_f_others,
          group_g: data.group_g,
          group_g_others: data.group_g_others,
          group_h: data.group_h,
          group_h_others: data.group_h_others,
          group_i: data.group_i,
          group_i_others: data.group_i_others,
          group_j: data.group_j,
          group_j_others: data.group_j_others,
          group_j2: data.group_j2,
          group_j2_others: data.group_j2_others,
          occupancy_classified: data.occupancy_classified,
          project_number_of_units: data.project_number_of_units,
          project_number_of_storey: data.project_number_of_storey,
          project_total_floor_area: data.project_total_floor_area,
          project_lot_area: data.project_lot_area,
          project_cost: data.project_cost,
          buidling: data.buidling,
          electrical: data.electrical,
          mechanical: data.mechanical,
          electronics: data.electronics,
          plumbing: data.plumbing,
          electrical_cost: data.electrical_cost,
          mechanical_cost: data.mechanical_cost,
          electronics_cost: data.electronics_cost,
          plumbing_cost: data.plumbing_cost,
          date_of_construction: data.date_of_construction,
          expected_date_of_completion: data.expected_date_of_completion,
          // BOX 2
          fulltime_inspector_name: data.fulltime_inspector_name,
          fulltime_inspector_date: data.fulltime_inspector_date,
          fulltime_inspector_address: data.fulltime_inspector_address,
          fulltime_inspector_prc_no: data.fulltime_inspector_prc_no,
          fulltime_inspector_ptr_no: data.fulltime_inspector_ptr_no,
          fulltime_inspector_issued_at: data.fulltime_inspector_issued_at,
          fulltime_inspector_validity: data.fulltime_inspector_validity,
          fulltime_inspector_date_issued: data.fulltime_inspector_date_issued,
          fulltime_inspector_tin_no: data.fulltime_inspector_tin_no,
          // BOX 3
          applicant_full_name: data.applicant_full_name,
          applicant_date: data.applicant_date,
          applicant_full_address: data.applicant_full_address,
          applicant_gov_id: data.applicant_gov_id,
          applicant_date_issued: data.applicant_date_issued,
          applicant_place_issued: data.applicant_place_issued,
          // BOX 4
          lot_owner_full_name: data.lot_owner_full_name,
          lot_owner_date: data.lot_owner_date,
          lot_owner_address: data.lot_owner_address,
          lot_owner_gov_id: data.lot_owner_gov_id,
          lot_owner_date_issued: data.lot_owner_date_issued,
          lot_owner_place_issued: data.lot_owner_place_issued,
          // BOX 5
          box_5_municipality: data.box_5_municipality,
          box_5_city: data.box_5_city,
          box_5_on: data.box_5_on,
          box_5_date_issued: data.box_5_date_issued,
          box_5_place_issued: data.box_5_place_issued,
          box_5_licensed_architect_full_name:
            data.box_5_licensed_architect_full_name,
          box_5_licensed_architect_gov_id: data.box_5_licensed_architect_gov_id,
          box_5_date: data.box_5_date,
          box_5_licensed_architect_place_issued:
            data.box_5_licensed_architect_place_issued,
          // BOX 6
          zoning_admin: data.zoning_admin,
          for_building_structure: data.for_building_structure,
          zoning_admin_locational_acount: data.zoning_admin_locational_acount,
          zoning_admin_locational_assessment:
            data.zoning_admin_locational_assessment,
          zoning_admin_locational_amount_due:
            data.zoning_admin_locational_amount_due,
          zoning_admin_locational_assessed_by:
            data.zoning_admin_locational_assessed_by,
          for_building_structure_filin_account:
            data.for_building_structure_filin_account,
          for_building_structure_filin_assessment:
            data.for_building_structure_filin_assessment,
          for_building_structure_filin_amount_due:
            data.for_building_structure_filin_amount_due,
          for_building_structure_filin_assessed_by:
            data.for_building_structure_filin_assessed_by,
          for_building_structure_line_and_grade_account:
            data.for_building_structure_line_and_grade_account,
          for_building_structure_line_and_grade_assessment:
            data.for_building_structure_line_and_grade_assessment,
          for_building_structure_line_and_grade_amount_due:
            data.for_building_structure_line_and_grade_amount_due,
          for_building_structure_line_and_grade_assessed_by:
            data.for_building_structure_line_and_grade_assessed_by,
          for_building_structure_fencing_account:
            data.for_building_structure_fencing_account,
          for_building_structure_fencing_assessment:
            data.for_building_structure_fencing_assessment,
          for_building_structure_fencing_amount_due:
            data.for_building_structure_fencing_amount_due,
          for_building_structure_fencing_assessed_by:
            data.for_building_structure_fencing_assessed_by,
          for_building_structure_architectural_account:
            data.for_building_structure_architectural_account,
          for_building_structure_architectural_assessment:
            data.for_building_structure_architectural_assessment,
          for_building_structure_architectural_amount_due:
            data.for_building_structure_architectural_amount_due,
          for_building_structure_architectural_assessed_by:
            data.for_building_structure_architectural_assessed_by,
          for_building_structure_civil_account:
            data.for_building_structure_civil_account,
          for_building_structure_civil_assessment:
            data.for_building_structure_civil_assessment,
          for_building_structure_civil_amount_due:
            data.for_building_structure_civil_amount_due,
          for_building_structure_civil_assessed_by:
            data.for_building_structure_civil_assessed_by,
          for_building_structure_electrical_account:
            data.for_building_structure_electrical_account,
          for_building_structure_electrical_assessment:
            data.for_building_structure_electrical_assessment,
          for_building_structure_electrical_amount_due:
            data.for_building_structure_electrical_amount_due,
          for_building_structure_electrical_assessed_by:
            data.for_building_structure_electrical_assessed_by,
          for_building_structure_mechanical_account:
            data.for_building_structure_mechanical_account,
          for_building_structure_mechanical_assessment:
            data.for_building_structure_mechanical_assessment,
          for_building_structure_mechanical_amount_due:
            data.for_building_structure_mechanical_amount_due,
          for_building_structure_mechanical_assessed_by:
            data.for_building_structure_mechanical_assessed_by,
          for_building_structure_sanitary_account:
            data.for_building_structure_sanitary_account,
          for_building_structure_sanitary_assessment:
            data.for_building_structure_sanitary_assessment,
          for_building_structure_sanitary_amount_due:
            data.for_building_structure_sanitary_amount_due,
          for_building_structure_sanitary_assessed_by:
            data.for_building_structure_sanitary_assessed_by,
          for_building_structure_plumbing_account:
            data.for_building_structure_plumbing_account,
          for_building_structure_plumbing_assessment:
            data.for_building_structure_plumbing_assessment,
          for_building_structure_plumbing_amount_due:
            data.for_building_structure_plumbing_amount_due,
          for_building_structure_plumbing_assessed_by:
            data.for_building_structure_plumbing_assessed_by,
          for_building_structure_electronics_account:
            data.for_building_structure_electronics_account,
          for_building_structure_electronics_assessed:
            data.for_building_structure_electronics_assessed,
          for_building_structure_electronics_amount_due:
            data.for_building_structure_electronics_amount_due,
          for_building_structure_electronics_assessed_by:
            data.for_building_structure_electronics_assessed_by,
          for_building_structure_interior_account:
            data.for_building_structure_interior_account,
          for_building_structure_interior_assessment:
            data.for_building_structure_interior_assessment,
          for_building_structure_interior_amount_due:
            data.for_building_structure_interior_amount_due,
          for_building_structure_interior_assessed_by:
            data.for_building_structure_interior_assessed_by,
          for_building_structure_surcharges_account:
            data.for_building_structure_surcharges_account,
          for_building_structure_surcharges_assessment:
            data.for_building_structure_surcharges_assessment,
          for_building_structure_surcharges_amount_due:
            data.for_building_structure_surcharges_amount_due,
          for_building_structure_surcharges_assessed_by:
            data.for_building_structure_surcharges_assessed_by,
          for_building_structure_penalties_account:
            data.for_building_structure_penalties_account,
          for_building_structure_penalties_assessment:
            data.for_building_structure_penalties_assessment,
          for_building_structure_penalties_amount_due:
            data.for_building_structure_penalties_amount_due,
          for_building_structure_penalties_assessed_by:
            data.for_building_structure_penalties_assessed_by,
          bfp_fire_code_account: data.bfp_fire_code_account,
          bfp_fire_code_assessment: data.bfp_fire_code_assessment,
          bfp_fire_code_amount_due: data.bfp_fire_code_amount_due,
          bfp_fire_code_assessed_by: data.bfp_fire_code_assessed_by,
          bfp_hotworks_account: data.bfp_hotworks_account,
          bfp_hotworks_assessment: data.bfp_hotworks_assessment,
          bfp_hotworks_amount_due: data.bfp_hotworks_amount_due,
          bfp_hotworks_assessed_by: data.bfp_hotworks_assessed_by,
          basis_of_assessment_total: data.basis_of_assessment_total,
          amount_due_total: data.amount_due_total,
          assessed_by_total: data.assessed_by_total,
        };
        this.submitBuildingFormData(
          buildingPermitBody,
          applicationId
        ).subscribe((res) => {});
        break;
      case 3:
        break;
      default:
        break;
    }
  }

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
        projectDetails.project_cost_cap == ''
          ? 0
          : `${NumberToWords.toWords(
              projectDetails.project_cost_cap == ''
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
