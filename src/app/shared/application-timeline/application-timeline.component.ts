import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DatePipe } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrls: ['./application-timeline.component.scss'],
})
export class ApplicationTimelineComponent implements OnInit {
  @Input() id;
  @Input() page;
  @Input() permitType;
  @ViewChild('stepper') stepper: MatStepper;
  public isLoading: boolean = false;
  public applicationId;
  public applicationTimeline;
  public cbaoTimeline;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private applicationService: ApplicationInfoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (this.page == 'home') {
      this.applicationId = this.id;
    } else {
      this.applicationId = this.route.snapshot.paramMap.get('id');
    }
    this.getApplicationTimeline();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.applicationId = changes.id.currentValue;
    this.getApplicationTimeline();
  }

  getApplicationTimeline() {
    this.applicationService
      .fetchApplicationTmeline(this.applicationId)
      .subscribe((res) => {
        console.log(res.data);
        this.applicationTimeline = res.data;
        //this.applicationTimeline = [{"id":120,"application_id":33,"name":"Applicant","status":"Submitted","created_at":"2021-06-17T00:45:53.000000Z","updated_at":"2021-06-17T00:45:53.000000Z","color":"orange","office_id":4,"sub_office_id":1},{"id":122,"application_id":33,"name":"City Buildings and Architecture Office","status":"Returned to Applicant","created_at":"2021-06-17T00:51:15.000000Z","updated_at":"2021-06-17T00:51:15.000000Z","color":"red","office_id":4,"sub_office_id":1},{"id":123,"application_id":33,"name":"Applicant","status":"Submitted","created_at":"2021-06-17T00:52:23.000000Z","updated_at":"2021-06-17T00:52:23.000000Z","color":"orange","office_id":4,"sub_office_id":1},{"id":124,"application_id":33,"name":"Applicant","status":"Submitted","created_at":"2021-06-17T00:52:23.000000Z","updated_at":"2021-06-17T00:52:23.000000Z","color":"orange","office_id":4,"sub_office_id":1},{"id":125,"application_id":33,"name":"Receiving","status":"Approved","created_at":"2021-06-17T00:53:36.000000Z","updated_at":"2021-06-17T00:53:36.000000Z","color":"green","office_id":4,"sub_office_id":1},{"id":128,"application_id":33,"name":"CBAO - Technical Evaluators","status":"Review Done","created_at":"2021-06-17T01:48:40.000000Z","updated_at":"2021-06-17T01:48:40.000000Z","color":"green","office_id":4,"sub_office_id":2},{"id":129,"application_id":33,"name":"CBAO - Division Chief","status":"Returned to Applicant","created_at":"2021-06-17T01:52:16.000000Z","updated_at":"2021-06-17T01:52:16.000000Z","color":"red","office_id":4,"sub_office_id":3},{"id":130,"application_id":33,"name":"Applicant","status":"Submitted","created_at":"2021-06-17T02:52:19.000000Z","updated_at":"2021-06-17T02:52:19.000000Z","color":"orange","office_id":4,"sub_office_id":3},{"id":131,"application_id":33,"name":"CBAO - Technical Evaluators","status":"Review Done","created_at":"2021-06-17T02:54:56.000000Z","updated_at":"2021-06-17T02:54:56.000000Z","color":"green","office_id":4,"sub_office_id":2},{"id":132,"application_id":33,"name":"CBAO - Division Chief","status":"Approved","created_at":"2021-06-17T02:55:23.000000Z","updated_at":"2021-06-17T02:55:23.000000Z","color":"green","office_id":4,"sub_office_id":3},{"id":133,"application_id":33,"name":"CBAO - Building Official","status":"Approved","created_at":"2021-06-17T02:55:44.000000Z","updated_at":"2021-06-17T02:55:44.000000Z","color":"green","office_id":4,"sub_office_id":4},{"id":134,"application_id":33,"name":"City Treasury Office","status":"Paid - Permit Fees","created_at":"2021-06-17T02:59:42.000000Z","updated_at":"2021-06-17T02:59:42.000000Z","color":null,"office_id":4,"sub_office_id":5},{"id":135,"application_id":33,"name":"Releasing","status":"Permit Released","created_at":"2021-06-17T03:00:22.000000Z","updated_at":"2021-06-17T03:00:22.000000Z","color":"green","office_id":4,"sub_office_id":6}];
        this.applicationService
          .fetchCbaoTimeline(this.applicationId)
          .subscribe((res) => {
            this.cbaoTimeline = res.data;
            //this.cbaoTimeline = [{"id":37,"application_id":33,"evaluator_user_id":17,"name":"CBAO-Structural","status":"Review Done - Approved","created_at":"2021-06-17T01:38:38.000000Z","updated_at":"2021-06-17T01:38:38.000000Z","color":"green","evaluator_detail":{"id":17,"first_name":"Maxwell","last_name":"Matiwtiw"}},{"id":38,"application_id":33,"evaluator_user_id":13,"name":"CBAO-Line and Grade","status":"Review Done - For Compliance","created_at":"2021-06-17T01:42:22.000000Z","updated_at":"2021-06-17T01:42:22.000000Z","color":"red","evaluator_detail":{"id":13,"first_name":"Roger","last_name":"Nawen"}},{"id":39,"application_id":33,"evaluator_user_id":20,"name":"CBAO-Electrical","status":"Review Done - For Compliance","created_at":"2021-06-17T01:48:40.000000Z","updated_at":"2021-06-17T01:48:40.000000Z","color":"red","evaluator_detail":{"id":20,"first_name":"Renato","last_name":"Ciano"}},{"id":40,"application_id":33,"evaluator_user_id":13,"name":"CBAO-Line and Grade","status":"Review Done - Approved","created_at":"2021-06-17T02:54:02.000000Z","updated_at":"2021-06-17T02:54:02.000000Z","color":"green","evaluator_detail":{"id":13,"first_name":"Roger","last_name":"Nawen"}},{"id":41,"application_id":33,"evaluator_user_id":20,"name":"CBAO-Electrical","status":"Review Done - Approved","created_at":"2021-06-17T02:54:56.000000Z","updated_at":"2021-06-17T02:54:56.000000Z","color":"green","evaluator_detail":{"id":20,"first_name":"Renato","last_name":"Ciano"}}];
            this.populateTimeline();
            this.populateCbaoTimeline();
            this.hideBoxes(this.permitType);
          });
      });
  }

  populateTimeline() {
    const receivingList = document.querySelector('#receiving-list .timeline-box');
    const divisionChiefList = document.querySelector('#division-chief-list .timeline-box');
    const buildingOfficialList = document.querySelector('#building-official-list .timeline-box');
    const releasingList = document.querySelector('#releasing-list .timeline-box');
    const cpdoList = document.querySelector('#cpdo-list .timeline-box');
    const bfpList = document.querySelector('#bfp-list .timeline-box');
    const cepmoList = document.querySelector('#cepmo-list .timeline-box');

    const receivingBox = document.querySelector('#receiving .timeline-box');
    const divisionChiefBox = document.querySelector('#division-chief .timeline-box');
    const buildingOfficialBox = document.querySelector('#building-official .timeline-box');
    const releasingBox = document.querySelector('#releasing .timeline-box');
    const cpdoBox = document.querySelector('#cpdo .timeline-box');
    const bfpBox = document.querySelector('#bfp .timeline-box');
    const cepmoBox = document.querySelector('#cepmo .timeline-box');
    const matStepperButtons = document.querySelectorAll('.mat-step-header');

    this.applicationTimeline.forEach(status => {
      const timelineLog = document.createElement('li');
      const timelineLogStatus = document.createElement('div');
      timelineLogStatus.innerText = status.status;
      timelineLogStatus.style.color = status.color != 'orange' ? status.color : 'gray';
      const timelineLogDate = document.createElement('div');
      timelineLogDate.innerText = new DatePipe('en-US').transform(status.created_at, 'MMMM dd, yyyy hh:mm:ss a');
      timelineLog.appendChild(timelineLogStatus);
      timelineLog.appendChild(timelineLogDate);

      let boxPointer = null;
      switch(status.office_id) {
        case 1:
          if (status.sub_office_id == 1) {
            cpdoList.querySelector('ul:first-of-type').appendChild(timelineLog);
            cpdoBox.querySelector('ul:first-of-type').innerHTML = timelineLog.innerHTML;
            boxPointer = cpdoBox;
            this.stepper.selectedIndex = 1;
            matStepperButtons[1].classList.add('enable-pointer-events');
          } else if (status.sub_office_id == 2) {
            cpdoList.querySelector('ul:last-of-type').appendChild(timelineLog);
            cpdoBox.querySelector('ul:last-of-type').innerHTML = timelineLog.innerHTML;
            boxPointer = cpdoBox;
            this.stepper.selectedIndex = 1;
            matStepperButtons[1].classList.add('enable-pointer-events');
          }
          break;
        case 2:
          bfpList.querySelector('ul').appendChild(timelineLog);
          bfpBox.querySelector('ul').innerHTML = timelineLog.innerHTML;
          boxPointer = bfpBox;
          this.stepper.selectedIndex = 2;
          matStepperButtons[2].classList.add('enable-pointer-events');
          break;
        case 3:
          cepmoList.querySelector('ul').appendChild(timelineLog);
          cepmoBox.querySelector('ul').innerHTML = timelineLog.innerHTML;
          boxPointer = cepmoBox;
          this.stepper.selectedIndex = 2;
          matStepperButtons[2].classList.add('enable-pointer-events');
          break;
        case 4:
          if (status.sub_office_id == 1) {
            receivingList.querySelector('ul').appendChild(timelineLog);
            receivingBox.querySelector('ul').innerHTML = timelineLog.innerHTML;
            boxPointer = receivingBox;
            this.stepper.selectedIndex = 0;
            matStepperButtons[0].classList.add('enable-pointer-events');
          } else if (status.sub_office_id == 2) {
            this.stepper.selectedIndex = 2;
            matStepperButtons[2].classList.add('enable-pointer-events');
          } else if (status.sub_office_id == 3) {
            divisionChiefList.querySelector('ul').appendChild(timelineLog);
            divisionChiefBox.querySelector('ul').innerHTML = timelineLog.innerHTML;
            boxPointer = divisionChiefBox;
            this.stepper.selectedIndex = 3;
            matStepperButtons[3].classList.add('enable-pointer-events');
          } else if (status.sub_office_id == 4) {
            buildingOfficialList.querySelector('ul').appendChild(timelineLog);
            buildingOfficialBox.querySelector('ul').innerHTML = timelineLog.innerHTML;
            boxPointer = buildingOfficialBox;
            this.stepper.selectedIndex = 4;
            matStepperButtons[4].classList.add('enable-pointer-events');
          } else if (status.sub_office_id == 5) {
            releasingList.querySelector('ul').appendChild(timelineLog);
            releasingBox.querySelector('ul').innerHTML = timelineLog.innerHTML;
            boxPointer = releasingBox;
            this.stepper.selectedIndex = 5;
            matStepperButtons[5].classList.add('enable-pointer-events');
          } else if (status.sub_office_id == 6) {
            releasingList.querySelector('ul').appendChild(timelineLog);
            releasingBox.querySelector('ul').innerHTML = timelineLog.innerHTML;
            boxPointer = releasingBox;
            this.stepper.selectedIndex = 5;
            matStepperButtons[5].classList.add('enable-pointer-events');
          }
          break;
      }
      if (boxPointer != null) {
        if (status.color == 'red') {
          boxPointer.classList.add('non-compliant');
          boxPointer.classList.remove('compliant');
          boxPointer.classList.remove('pending');
        } else if (status.color == 'green') {
          boxPointer.classList.add('compliant');
          boxPointer.classList.remove('non-compliant');
          boxPointer.classList.remove('pending');
        } else {
          boxPointer.classList.add('pending');
          boxPointer.classList.remove('non-compliant');
          boxPointer.classList.remove('compliant');
        }
      }
    });
    this.isLoading = false;
  }

  populateCbaoTimeline() {
    const cbaoList = document.querySelector('#cbao-list .timeline-box');
    const cbaoBox = document.querySelector('#cbao .timeline-box');

    this.cbaoTimeline.forEach(status => {
      const cbaoTimelineLog = document.createElement('li');
      const cbaoTimelineLogStatus = document.createElement('div');
      cbaoTimelineLogStatus.innerText = status.status;
      cbaoTimelineLogStatus.style.color = status.color;
      const cbaoTimelineLogDate = document.createElement('div');
      cbaoTimelineLogDate.innerText = new DatePipe('en-US').transform(status.created_at, 'MMMM dd, yyyy hh:mm:ss a');
      cbaoTimelineLog.appendChild(cbaoTimelineLogStatus);
      cbaoTimelineLog.appendChild(cbaoTimelineLogDate);

      switch(status.name) {
        case 'CBAO-Line and Grade':
          cbaoList.querySelector('ul:nth-of-type(1)').appendChild(cbaoTimelineLog);
          cbaoBox.querySelector('ul:nth-of-type(1)').innerHTML = cbaoTimelineLog.innerHTML;
          break;
        case 'CBAO-Architectural':
          cbaoList.querySelector('ul:nth-of-type(2)').appendChild(cbaoTimelineLog);
          cbaoBox.querySelector('ul:nth-of-type(2)').innerHTML = cbaoTimelineLog.innerHTML;
          break;
        case 'CBAO-Structural':
          cbaoList.querySelector('ul:nth-of-type(3)').appendChild(cbaoTimelineLog);
          cbaoBox.querySelector('ul:nth-of-type(3)').innerHTML = cbaoTimelineLog.innerHTML;
          break;
        case 'CBAO-Sanitary':
          cbaoList.querySelector('ul:nth-of-type(4)').appendChild(cbaoTimelineLog);
          cbaoBox.querySelector('ul:nth-of-type(4)').innerHTML = cbaoTimelineLog.innerHTML;
          break;
        case 'CBAO-Electrical':
          cbaoList.querySelector('ul:nth-of-type(5)').appendChild(cbaoTimelineLog);
          cbaoBox.querySelector('ul:nth-of-type(5)').innerHTML = cbaoTimelineLog.innerHTML;
          break;
      }
      /*if (status.color == 'red') {
        cbaoBox.classList.remove('compliant');
        cbaoBox.classList.add('non-compliant');
      }
      else if (status.color == 'green') {
        cbaoBox.classList.add('compliant');
        cbaoBox.classList.remove('non-compliant');
      }*/
    });
  }

  public hideBoxes(permitType) {
    if (permitType != '1') {
      const flowChart = document.querySelector('.application-timeline.flowchart');
      flowChart.classList.add('cbao-only');
    }
  }
}
