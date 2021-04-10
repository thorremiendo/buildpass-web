import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInfoService, EvaluatorService } from '../../core';

@Component({
  selector: 'app-evaluator-home',
  templateUrl: './evaluator-home.component.html',
  styleUrls: ['./evaluator-home.component.scss'],
})
export class EvaluatorHomeComponent implements OnInit {
  public userInfo;
  public applications;
  public evaluatorDetails;
  public date = new Date();
  public loading:boolean = true;

  public application: string | number;
  public pending: string | number;
  public current: string | number;
  public completed: string | number;

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private _router: Router,
    private evaluatorService: EvaluatorService,
    private applicationInfoService: ApplicationInfoService
  ) {
    this.navLinks = [
      {
        label: 'Table View',
        link: './table',
        index: 0,
      },
      {
        label: 'Calendar View',
        link: './calendar',
        index: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    if (this.userInfo) {
      console.log(this.userInfo)
      this.fetchTaskCount(this.userInfo.id);
    }

    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    this.applicationInfoService.fetchApplications().subscribe((res) => {
      this.applications = res.data;
    });
  }

  fetchTaskCount(id) {
    this.evaluatorService.fetchTaskCount(id).subscribe((res) => {
      let data = res.data[0];
      console.log(data);

      this.application = data.application;
      this.pending = data.pending;
      this.current = data.current;
      this.completed = data.completed;
      this.loading = false;
    },
    (err)=>{
      console.log(err);
    });
  }

  openApplication(id) {
    this._router.navigate(['evaluator/application', id]);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  handleView() {
    this._router.navigateByUrl('evaluator/application');
  }
}
