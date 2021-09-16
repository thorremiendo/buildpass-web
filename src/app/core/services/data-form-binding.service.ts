import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
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

  constructor(
    private api: ApiService,
    private applicationService: ApplicationInfoService
  ) {}

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
    const body = data;
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
          project_nature_new: data.project_nature_new
            ? data.project_nature_new
            : '',
          project_nature_others_specify: data.project_nature_others_specify
            ? data.project_nature_others_specify
            : '',
          project_nature_improvement: data.project_nature_improvement
            ? data.project_nature_improvement
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
          right_over_land_owner: data.right_over_land_owner
            ? data.right_over_land_owner
            : '',
          right_over_land_lessee: data.right_over_land_lessee
            ? data.right_over_land_lessee
            : '',
          right_over_land_others_specify: data.right_over_land_others_specify
            ? data.right_over_land_others_specify
            : '',
          right_over_land_others: data.right_over_land_others
            ? data.right_over_land_others
            : '',
          project_tenure_permanent: data.project_tenure_permanent
            ? data.project_tenure_permanent
            : '',
          project_tenure_temporary_specify:
            data.project_tenure_temporary_specify
              ? data.project_tenure_temporary_specify
              : '',
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
        this.submitZoningFormData(zoningBody, applicationId).subscribe(
          (res) => {
            this.applicationService
              .updateApplicationInfo(body, applicationId)
              .subscribe((res) => {});
          }
        );
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
        ).subscribe((res) => {
          this.applicationService
            .updateApplicationInfo(body, applicationId)
            .subscribe((res) => {});
        });
        break;
      case 3:
        const sanitaryBody = {
          // application_number: data.application_number,
          application_date: data.application_date,
          permit_number: data.permit_number,
          date_issued: data.date_issued,
          project_house_number: data.project_house_number,
          project_street_name: data.project_street_name,
          project_barangay: data.project_barangay,
          project_city: data.project_city,
          applicant_contact_number: data.applicant_contact_number,
          location_of_installation: data.location_of_installation,
          scope_of_work: data.scope_of_work,
          scope_of_work_addition: data.scope_of_work_addition,
          scope_of_work_repair: data.scope_of_work_repair,
          scope_of_work_removal: data.scope_of_work_removal,
          scope_of_work_other_one: data.scope_of_work_other_one,
          scope_of_work_other_two: data.scope_of_work_other_two,
          scope_of_work_other_one_of: data.scope_of_work_other_one_of,
          scope_of_work_other_two_of: data.scope_of_work_other_two_of,
          new_fixtures: data.new_fixtures,
          existing_fixtures: data.existing_fixtures,
          fixtures: data.fixtures,
          fixtures_qty_water_closet: data.fixtures_qty_water_closet,
          fixtures_qty_floor_drain: data.fixtures_qty_floor_drain,
          fixtures_qty_lavatories: data.fixtures_qty_lavatories,
          fixtures_qty_kitchen_sink: data.fixtures_qty_kitchen_sink,
          fixtures_qty_faucet: data.fixtures_qty_faucet,
          fixtures_qty_shower_head: data.fixtures_qty_shower_head,
          fixtures_qty_water_meter: data.fixtures_qty_water_meter,
          fixtures_qty_grease_trap: data.fixtures_qty_grease_trap,
          fixtures_qty_bath_tubs: data.fixtures_qty_bath_tubs,
          fixtures_qty_slap_sink: data.fixtures_qty_slap_sink,
          fixtures_qty_urinal: data.fixtures_qty_urinal,
          fixtures_qty_air_condition: data.fixtures_qty_air_condition,
          fixtures_qty_water_tank: data.fixtures_qty_water_tank,
          fixtures_qty_bidette: data.fixtures_qty_bidette,
          fixtures_qty_laundry: data.fixtures_qty_laundry,
          fixtures_qty_dental: data.fixtures_qty_dental,
          fixtures_qty_electrical: data.fixtures_qty_electrical,
          fixtures_qty_water_boil: data.fixtures_qty_water_boil,
          fixtures_qty_drinking: data.fixtures_qty_drinking,
          fixtures_qty_bar_sink: data.fixtures_qty_bar_sink,
          fixtures_qty_soda_fountain: data.fixtures_qty_soda_fountain,
          fixtures_qty_laboratory_sink: data.fixtures_qty_laboratory_sink,
          fixtures_qty_sterilizer: data.fixtures_qty_sterilizer,
          fixtures_qty_swimming_pool: data.fixtures_qty_swimming_pool,
          fixtures_qty_others: data.fixtures_qty_others,
          fixtures_qty_total_one: data.fixtures_qty_total_one,
          fixtures_qty_total_two: data.fixtures_qty_total_two,
          water_supply: data.water_supply,
          system_supply: data.system_supply,
          project_number_of_storey: data.project_number_of_storey,
          project_total_floor_area: data.project_total_floor_area,
          start_of_installation: data.start_of_installation,
          total_cost_of_installation: data.total_cost_of_installation,
          completion: data.completion,
          prepared_by: data.prepared_by,
          city_building_official: data.city_building_official,
          city_building_date: data.city_building_date,
          building_documents: data.building_documents,
          building_documents_others: data.building_documents_others,
          assessed_amount_one: data.assessed_amount_one,
          assessed_assessed_one: data.assessed_assessed_one,
          assessed_or_one: data.assessed_or_one,
          assessed_date_paid_one: data.assessed_date_paid_one,
          assessed_amount_two: data.assessed_amount_two,
          assessed_assessed_two: data.assessed_assessed_two,
          assessed_or_two: data.assessed_or_two,
          assessed_date_paid_two: data.assessed_date_paid_two,
          receiving_time_in: data.receiving_time_in,
          receiving_date_in: data.receiving_date_in,
          receiving_time_out: data.receiving_time_out,
          receiving_date_out: data.receiving_date_out,
          receiving_action: data.receiving_action,
          receiving_processed: data.receiving_processed,
          geodetic_time_in: data.geodetic_time_in,
          geodetic_date_in: data.geodetic_date_in,
          geodetic_time_out: data.geodetic_time_out,
          geodetic_date_out: data.geodetic_date_out,
          geodetic_action: data.geodetic_action,
          geodetic_processed: data.geodetic_processed,
          sanitary_time_in: data.sanitary_time_in,
          sanitary_date_in: data.sanitary_date_in,
          sanitary_time_out: data.sanitary_time_out,
          sanitary_date_out: data.sanitary_date_out,
          sanitary_action: data.sanitary_action,
          sanitary_processed: data.sanitary_processed,
          sanitary_engineer_name: data.sanitary_engineer_name,
          sanitary_engineer_address: data.sanitary_engineer_address,
          sanitary_engineer_ptr_no: data.sanitary_engineer_ptr_no,
          sanitary_engineer_date_issued: data.sanitary_engineer_date_issued,
          sanitary_engineer_tin: data.sanitary_engineer_tin,
          construction_prc_no: data.construction_prc_no,
          construction_name: data.construction_name,
          construction_address: data.construction_address,
          construction_ptr_no: data.construction_ptr_no,
          construction_date_issued: data.construction_date_issued,
          construction_tin_no: data.construction_tin_no,
          applicant_full_name: data.applicant_full_name,
          res_cert_no: data.res_cert_no,
          applicant_date_issued: data.applicant_date_issued,
          applicant_place_issued: data.applicant_place_issued,
        };
        this.submitSanitaryFormData(sanitaryBody, applicationId).subscribe(
          (res) => {
            this.applicationService
              .updateApplicationInfo(body, applicationId)
              .subscribe((res) => {});
          }
        );
        break;
      case 4:
        const electricalBody = {
          application_number: data.application_number,
          ep_number: data.ep_number,
          building_permit_number: data.building_permit_number,
          applicant_last_name: data.applicant_last_name,
          applicant_first_name: data.applicant_first_name,
          applicant_middle_name: data.applicant_middle_name,
          applicant_tin_number: data.applicant_tin_number,
          for_construction: data.for_construction,
          form_of_ownership: data.form_of_ownership,
          char_of_occupancy: data.char_of_occupancy,
          applicant_house_number: data.applicant_house_number,
          applicant_street_name: data.applicant_street_name,
          applicant_barangay: data.applicant_barangay,
          applicant_contact_number: data.applicant_contact_number,
          project_lot_number: data.project_lot_number,
          project_block_number: data.project_block_number,
          project_tct_number: data.project_tct_number,
          project_tax_dec_number: data.project_tax_dec_number,
          project_street_name: data.project_street_name,
          project_barangay: data.project_barangay,
          // SCOPE OF WORK
          scope_of_work: data.scope_of_work,
          scope_of_work_others: data.scope_of_work_others,
          // SUMARRY OF ELECTRICAL LOADS CAPACITIES APPLIED FOR
          total_connected_load: data.total_connected_load,
          total_transformer_capacity: data.total_transformer_capacity,
          total_generator_capacity: data.total_generator_capacity,
          // BOX 2
          professional_electrical_engineer:
            data.professional_electrical_engineer,
          professional_electrical_engineer_date:
            data.professional_electrical_engineer_date,
          professional_electrical_engineer_address:
            data.professional_electrical_engineer_address,
          professional_electrical_engineer_pcr_no:
            data.professional_electrical_engineer_pcr_no,
          professional_electrical_engineer_ptr_no:
            data.professional_electrical_engineer_ptr_no,
          professional_electrical_engineer_issued_at:
            data.professional_electrical_engineer_issued_at,
          professional_electrical_engineer_validity:
            data.professional_electrical_engineer_validity,
          professional_electrical_engineer_date_issued:
            data.professional_electrical_engineer_date_issued,
          professional_electrical_engineer_tin_no:
            data.professional_electrical_engineer_tin_no,
          // BOX 3
          supervisor: data.supervisor,
          supervisor_full_name: data.supervisor_full_name,
          supervisor_date: data.supervisor_date,
          supervisor_prc_no: data.supervisor_prc_no,
          supervisor_ptr_no: data.supervisor_ptr_no,
          supervisor_issued_at: data.supervisor_issued_at,
          supervisor_address: data.supervisor_address,
          supervisor_validity: data.supervisor_validity,
          supervisor_date_issued: data.supervisor_date_issued,
          supervisor_tin_no: data.supervisor_tin_no,
          // BOX 4
          applicant_full_name: data.applicant_full_name,
          building_owner_date: data.building_owner_date,
          applicant_full_address: data.applicant_full_address,
          building_owner_ctc_no: data.building_owner_ctc_no,
          building_owner_date_issued: data.building_owner_date_issued,
          building_owner_place_issued: data.building_owner_place_issued,
          // BOX 5
          lot_owner_full_name: data.lot_owner_full_name,
          lot_owner_date: data.lot_owner_date,
          lot_owner_address: data.lot_owner_address,
          lot_owner_ctc_no: data.lot_owner_ctc_no,
          lot_owner_date_issued: data.lot_owner_date_issued,
          lot_owner_place_issued: data.lot_owner_place_issued,
          // BOX 6
          received_by: data.received_by,
          received_by_date: data.received_by_date,
          electrical_documents: data.electrical_documents,
          electrical_documents_expected_date:
            data.electrical_documents_expected_date,
          electrical_documents_others: data.electrical_documents_others,
          progress_flow_electrical_date_in:
            data.progress_flow_electrical_date_in,
          progress_flow_electrical_time_in:
            data.progress_flow_electrical_time_in,
          progress_flow_electrical_date_out:
            data.progress_flow_electrical_date_out,
          progress_flow_electrical_time_out:
            data.progress_flow_electrical_time_out,
          progress_flow_others_date_in: data.progress_flow_others_date_in,
          progress_flow_others_time_in: data.progress_flow_others_time_in,
          progress_flow_others_date_out: data.progress_flow_others_date_out,
          progress_flow_others_time_out: data.progress_flow_others_time_out,
          // BOX 8
          building_official: data.building_official,
          building_official_date: data.building_official_date,
        };
        this.submitElectricalFormData(electricalBody, applicationId).subscribe(
          (res) => {
            this.applicationService
              .updateApplicationInfo(body, applicationId)
              .subscribe((res) => {});
          }
        );
        break;
      case 5:
        const noticeBody = {};
        this.applicationService
          .updateApplicationInfo(body, applicationId)
          .subscribe((res) => {});
        break;
      default:
        break;
    }
  }

  handleSaveExcavationForm(applicationId, data) {
    const body = {
      application_no: data.application_no,
      egpp_no: data.egpp_no,
      building_permit_no: data.building_permit_no,
      applicant_last_name: data.applicant_last_name,
      applicant_first_name: data.applicant_first_name,
      applicant_middle_name: data.applicant_middle_name,
      applicant_tin_number: data.applicant_tin_number,
      for_construction: data.for_construction,
      form_of_ownership: data.form_of_ownership,
      char_of_occupancy: data.char_of_occupancy,
      applicant_house_number: data.applicant_house_number,
      applicant_street_name: data.applicant_street_name,
      applicant_barangay: data.applicant_barangay,
      applicant_contact_number: data.applicant_contact_number,
      project_lot_number: data.project_lot_number,
      project_block_number: data.project_block_number,
      project_tct_number: data.project_tct_number,
      project_tax_dec_number: data.project_tax_dec_number,
      project_street_name: data.project_street_name,
      project_barangay: data.project_barangay,
      scope_of_work: data.scope_of_work,
      scope_of_work_renovation: data.scope_of_work_renovation,
      scope_of_work_repair: data.scope_of_work_repair,
      scope_of_work_others: data.scope_of_work_others,
      character_of_occupancy: data.character_of_occupancy,
      character_of_occupancy_others: data.character_of_occupancy_others,
      // BOX 2
      design_professional_name: data.design_professional_name,
      design_professional_date: data.design_professional_date,
      design_professional_address: data.design_professional_address,
      design_professional_prc_no: data.design_professional_prc_no,
      design_professional_ptr_no: data.design_professional_ptr_no,
      design_professional_validity: data.design_professional_validity,
      design_professional_date_issued: data.design_professional_date_issued,
      design_professional_tin_no: data.design_professional_tin_no,
      // BOX 3
      construction_of_works_name: data.construction_of_works_name,
      construction_of_works_date: data.construction_of_works_date,
      construction_of_works_address: data.construction_of_works_address,
      construction_of_works_pcr_no: data.construction_of_works_pcr_no,
      construction_of_works_ptr_no: data.construction_of_works_ptr_no,
      construction_of_works_issued_at: data.construction_of_works_issued_at,
      construction_of_works_validity: data.construction_of_works_validity,
      construction_of_works_date_issued: data.construction_of_works_date_issued,
      construction_of_works_tin_no: data.construction_of_works_tin_no,
      // BOX 4
      applicant_full_name: data.applicant_full_name,
      building_owner_date: data.building_owner_date,
      applicant_full_address: data.applicant_full_address,
      building_owner_ctc_no: data.building_owner_ctc_no,
      building_owner_date_issued: data.building_owner_date_issued,
      building_owner_place_issued: data.building_owner_place_issued,
      lot_owner_full_name: data.lot_owner_full_name,
      lot_owner_date: data.lot_owner_date,
      lot_owner_address: data.lot_owner_address,
      lot_owner_ctc_no: data.lot_owner_ctc_no,
      lot_owner_date_issued: data.lot_owner_date_issued,
      lot_owner_place_issued: data.lot_owner_place_issued,
      // BOX 6
      design_professional: data.design_professional,
      design_professional_others: data.design_professional_others,
      design_professional_others_one: data.design_professional_others_one,
      design_professional_others_two: data.design_professional_others_two,
      building_official: data.building_official,
      building_official_date: data.building_official_date,
    };
    this.submitExcavationFormData(body, applicationId).subscribe((res) => {});
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
      owner_name:
        `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
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
      owner_permitee:
        `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
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
      business_owner:
        `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      owner_address:
        `${applicantDetails.house_number} ${applicantDetails.street_name} ${applicantDetails.barangay}`.toUpperCase(),
      contact_no:
        applicantDetails.contact_number == 'undefined'
          ? 'N/A'
          : applicantDetails.contact_number,
    };

    return formData;
  }

  //GENERAL FORM DATA
  getFormData(a) {
    const applicantDetails = a.applicant_detail;
    const projectDetails = a.project_detail;
    const representativeDetails = a.representative_detail;
    // const projectCostCap = parseFloat(
    //   a.project_detail.project_cost_cap
    // ).toLocaleString();
    const projectLot = `Lot #${projectDetails.lot_number}`;
    const projectBlock = `Block #${projectDetails.block_number}`;
    const applicantLot = `Lot #${applicantDetails.lot_number}`;
    const applicantBlock = `Block #${applicantDetails.block_number}`;
    const formData = {
      owner_or_rep:
        `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      applicant_full_name:
        `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      applicant_complete_address: `${
        applicantDetails.house_number ? applicantDetails.house_number : ''
      }  ${applicantDetails.lot_number ? applicantLot : ''} ${
        applicantDetails.block_number ? applicantBlock : ''
      } ${applicantDetails.street_name ? applicantDetails.street_name : ''}
      ${applicantDetails.purok ? applicantDetails.purok : ''} ${
        applicantDetails.subdivision ? applicantDetails.subdivision : ''
      } ${applicantDetails.barangay}`.toUpperCase(),
      applicant_first_name:
        applicantDetails.first_name == ''
          ? ''
          : applicantDetails.first_name.toUpperCase(),
      applicant_last_name:
        applicantDetails.last_name == ''
          ? ''
          : applicantDetails.last_name.toUpperCase(),
      applicant_middle_name:
        applicantDetails.middle_name == ''
          ? ''
          : applicantDetails.middle_name.toUpperCase(),
      applicant_middle_initial:
        applicantDetails.middle_name == ''
          ? ''
          : applicantDetails.middle_name.charAt(0).toUpperCase(),
      applicant_suffix_name:
        applicantDetails.suffix_name == 'na'
          ? ' '
          : applicantDetails.suffix_name.toUpperCase(),
      applicant_tin_number:
        applicantDetails.tin_number == '' ? '' : applicantDetails.tin_number,
      applicant_contact_number:
        applicantDetails.contact_number == ''
          ? ''
          : applicantDetails.contact_number,
      applicant_email_address:
        applicantDetails.email_address == ''
          ? ''
          : applicantDetails.email_address.toUpperCase(),
      applicant_house_number:
        applicantDetails.house_number == ''
          ? ''
          : applicantDetails.house_number.toUpperCase(),
      applicant_unit_number:
        applicantDetails.unit_number == '' ? '' : applicantDetails.unit_number,
      applicant_floor_number:
        applicantDetails.floor_number == ''
          ? ''
          : applicantDetails.floor_number,
      applicant_street_name:
        applicantDetails.street_name == ''
          ? ''
          : applicantDetails.street_name.toUpperCase(),
      applicant_barangay:
        applicantDetails.barangay == ''
          ? ''
          : applicantDetails.barangay.toUpperCase(),
      applicant_province: 'BENGUET',
      applicant_city: 'BAGUIO CITY',
      appicant_zipcode: '2600',
      project_house_number:
        projectDetails.house_number == '' ? '' : projectDetails.house_number,
      project_lot_number:
        projectDetails.lot_number == '' ? '' : projectDetails.lot_number,
      project_block_number:
        projectDetails.block_number == '' ? '' : projectDetails.block_number,
      project_street_name:
        projectDetails.street_name == ''
          ? ''
          : projectDetails.street_name.toUpperCase(),
      project_number_of_units:
        projectDetails.number_of_units == ''
          ? ''
          : `${projectDetails.number_of_units}`,
      project_barangay:
        projectDetails.barangay == ''
          ? ''
          : projectDetails.barangay.toUpperCase(),
      project_number_of_basement:
        projectDetails.number_of_basement == ''
          ? ''
          : projectDetails.number_of_basement,
      project_lot_area:
        projectDetails.lot_area == '' ? '' : projectDetails.lot_area,
      project_total_floor_area:
        projectDetails.total_floor_area == ''
          ? ''
          : projectDetails.total_floor_area,
      project_units:
        projectDetails.number_of_units == ''
          ? ''
          : projectDetails.number_of_units,
      project_number_of_storey:
        projectDetails.number_of_storey == ''
          ? ''
          : `${projectDetails.number_of_storey}`,
      project_type: '',
      project_title:
        projectDetails.project_title == ''
          ? ''
          : projectDetails.project_title.toUpperCase(),
      // project_cost_cap: projectCostCap == '' ? '' : `${projectCostCap}`,
      project_cost_cap: projectDetails.project_cost_cap,
      project_tct_number:
        projectDetails.tct_number == '' ? '' : projectDetails.tct_number,
      project_tax_dec_number:
        projectDetails.tax_dec_number == ''
          ? ''
          : projectDetails.tax_dec_number,
      project_province: 'BENGUET',
      project_city: 'BAGUIO CITY',
      project_zipcode: '2600',
      inspector_name:
        representativeDetails == null
          ? 'N/A'
          : `${representativeDetails.first_name.toUpperCase()} ${representativeDetails.last_name.toUpperCase()}`,
      inspector_profession: projectDetails.inspector_profession,
      inspector_prc_no:
        representativeDetails == null ? 'N/A' : representativeDetails.prc_no,
      complete_project_location: `${
        projectDetails.house_number ? projectDetails.house_number : ''
      } ${projectDetails.lot_number ? projectLot : ''} ${
        projectDetails.block_number ? projectBlock : ''
      } ${projectDetails.street_name ? projectDetails.street_name : ''}
      ${projectDetails.subdivision ? projectDetails.subdivision : ''} ${
        projectDetails.barangay
      }`.toUpperCase(),

      amount_in_words:
        projectDetails.project_cost_cap == ''
          ? 0
          : `${NumberToWords.toWords(
              projectDetails.project_cost_cap == ''
                ? 0
                : projectDetails.project_cost_cap
            ).toUpperCase()} PESOS`,
      fulltime_inspector_name:
        representativeDetails == null
          ? 'N/A'
          : `${representativeDetails.first_name.toUpperCase()} ${representativeDetails.last_name.toUpperCase()}`,

      fulltime_inspector_address:
        representativeDetails == null
          ? 'N/A'
          : `${representativeDetails.house_number} ${representativeDetails.street_name} ${representativeDetails.barangay}`,
      fulltime_inspector_prc_no:
        representativeDetails == null ? 'N/A' : representativeDetails.prc_no,
      fulltime_inspector_ptr_no:
        representativeDetails == null ? 'N/A' : representativeDetails.ptc_no,
      rep_first_name:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.first_name,
      rep_middle_name:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.middle_name,
      rep_last_name:
        representativeDetails == null ? 'N/A' : representativeDetails.last_name,
      rep_house_number:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.house_number,
      rep_street_name:
        representativeDetails == null
          ? 'N/A'
          : representativeDetails.street_name,
      rep_barangay:
        representativeDetails == null ? 'N/A' : representativeDetails.barangay,
      rep_province: representativeDetails == null ? 'N/A' : 'Baguio City',
      name_of_corporation: 'N/A',
      corporation_contact_number: 'N/A',
      corporation_address_no: 'N/A',
      corporation_address_barangay: ' N/A',
      corporation_address_city: 'N/A',
      //TODO: data binding
      existing_land_others: 'N/A',
      position_title: 'N/A',
    };

    return formData;
  }

  getUnifiedBpFees(a) {
    const fee = a;
    const fees = {
      fees_3419_amount: `${fee.fees_3419_amount}`,
      fees_3419_assessed_by: `${fee.fees_3419_assessed_by}`,
      fees_4859_amount: `${fee.fees_4859_amount}`,
      fees_4859_assessed_by: `${fee.fees_4859_assessed_by}`,
      fees_5420_amount: `${fee.fees_5420_amount}`,
      fees_5420_assessed_by: `${fee.fees_5420_assessed_by}`,
      fees_5421_amount: `${fee.fees_5421_amount}`,
      fees_5421_assessed_by: `${fee.fees_5421_assessed_by}`,
      fees_5422_amount: `${fee.fees_5422_amount}`,
      fees_5422_assessed_by: `${fee.fees_5422_assessed_by}`,
      fees_5423_amount: `${fee.fees_5423_amount}`,
      fees_5423_assessed_by: `${fee.fees_5423_assessed_by}`,
      fees_5424_amount: `${fee.fees_5424_amount}`,
      fees_5424_assessed_by: `${fee.fees_5424_assessed_by}`,
      fees_5425_amount: `${fee.fees_5425_amount}`,
      fees_5425_assessed_by: `${fee.fees_5425_assessed_by}`,
      fees_5426_amount: `${fee.fees_5426_amount ? fee.fees_5426_amount : ''}`,
      fees_5426_assessed_by: `${
        fee.fees_5426_assessed_by ? fee.fees_5426_assessed_by : ''
      }`,
      fees_5427_amount: `${fee.fees_5427_amount}`,
      fees_5427_assessed_by: `${fee.fees_5427_assessed_by}`,
      fees_5428_amount: `${fee.fees_5428_amount}`,
      fees_5428_assessed_by: `${fee.fees_5428_assessed_by}`,
      fees_5432_amount: `${fee.fees_5432_amount}`,
      fees_5432_assessed_by: `${fee.fees_5432_assessed_by}`,
      fees_5959_amount: `${fee.fees_5959_amount}`,
      fees_5959_assessed_by: `${fee.fees_5959_assessed_by}`,
      total: fee.total,
    };
    return fees;
  }
}
