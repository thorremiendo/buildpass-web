import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-technical-evaluation',
  templateUrl: './technical-evaluation.component.html',
  styleUrls: ['./technical-evaluation.component.scss'],
})
export class TechnicalEvaluationComponent implements OnInit {
  @Input() evaluatorDetails;
  @Input() applicationDetails;
  public userDocs;
  public cbaoTimeline;
  constructor(private applicationServce: ApplicationInfoService) {}

  ngOnInit(): void {
    this.userDocs = this.applicationDetails.user_docs;
    this.applicationServce
      .fetchCbaoTimeline(this.applicationDetails.id)
      .subscribe((res) => {
        this.cbaoTimeline = res.data;
        console.log(this.cbaoTimeline);
        console.log(this.checkMechanicalApplicable());
        console.log(this.checkElectronicsApplicable());
      });
  }

  checkMechanicalApplicable() {
    const mechanicalForm = this.userDocs.find(
      (form) => form.document_id == 117
    );
    if (mechanicalForm) {
      if (mechanicalForm.is_applicable == 2) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  checkElectronicsApplicable() {
    const electronicsForm = this.userDocs.find(
      (form) => form.document_id == 195
    );
    if (electronicsForm) {
      if (electronicsForm.is_applicable == 2) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
