import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technical-findings',
  templateUrl: './technical-findings.component.html',
  styleUrls: ['./technical-findings.component.scss'],
})
export class TechnicalFindingsComponent implements OnInit {
  @Input() applicationDetails;
  @Input() evaluatorDetails;

  public technicalFindingsForm: FormGroup;
  public isLoading: boolean = false;
  public technicalFindings;
  get technicalFindingsFormControl() {
    return this.technicalFindingsForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.technicalFindings = this.applicationDetails.technical_finding_detail;
    this.checkIfCpdo();
    if (this.technicalFindings) {
      this.technicalFindingsForm.patchValue({
        zone: this.technicalFindings.zone,
        isZonal: this.technicalFindings.is_zonal.toString(),
        setBackFront: this.technicalFindings.setback_front,
        setBackRear: this.technicalFindings.setback_rear,
        setBackRight: this.technicalFindings.setback_right,
        setBackLeft: this.technicalFindings.setback_left,
        roadLevel: this.technicalFindings.road_level,
        allowable: this.technicalFindings.allowable,
        allowableWithin: this.technicalFindings.allowable_within,
        parkingReq: this.technicalFindings.parking_req,
        parkingReqWithin: this.technicalFindings.parking_req_within,
        parkingSpace: this.technicalFindings.parking_space,
      });
      this.technicalFindingsForm.disable();
    }
  }
  checkIfCpdo() {
    if (this.evaluatorDetails.office_id == 1) {
      return true;
    } else {
      return false;
    }
  }
  createForm() {
    this.technicalFindingsForm = this.fb.group({
      zone: ['', Validators.required],
      isZonal: ['', Validators.required],
      setBackFront: ['', Validators.required],
      setBackRear: ['', Validators.required],
      setBackRight: ['', Validators.required],
      setBackLeft: ['', Validators.required],
      roadLevel: ['', Validators.required],
      allowable: ['', Validators.required],
      allowableWithin: ['', Validators.required],
      parkingReq: ['', Validators.required],
      parkingReqWithin: ['', Validators.required],
      parkingSpace: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.technicalFindingsForm.valid) {
      const value = this.technicalFindingsForm.value;
      const body = {
        zone: value.zone,
        is_zonal: value.isZonal,
        setback_front: value.setBackFront,
        setback_rear: value.setBackRear,
        setback_right: value.setBackRight,
        setback_left: value.setBackLeft,
        road_level: value.roadLevel,
        allowable: value.allowable,
        allowable_within: value.allowableWithin,
        parking_req: value.parkingReq,
        parking_req_within: value.parkingReqWithin,
        parking_space: value.parkingSpace,
      };
      this.applicationService
        .submitTechnicalFindings(body, this.applicationDetails.id)
        .subscribe((res) => {
          Swal.fire('Success!', `Information Saved!.`, 'success').then(
            (result) => {
              this.ngOnInit();
            }
          );
        });
    } else {
      Swal.fire(
        'Info!',
        `Please fill out all fields!.`,
        'error'
      ).then((result) => {});
    }
  }
}
