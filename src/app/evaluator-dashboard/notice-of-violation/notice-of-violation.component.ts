import { Router } from '@angular/router';
import { NoticeOfViolationService } from 'src/app/core/services/notice-of-violation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-of-violation',
  templateUrl: './notice-of-violation.component.html',
  styleUrls: ['./notice-of-violation.component.scss'],
})
export class NoticeOfViolationComponent implements OnInit {
  userInfo;
  displayedColumns: string[] = ['name', 'status', 'type', 'action'];
  dataSource;
  constructor(private nov: NoticeOfViolationService, private router: Router) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));

    this.nov.getInvestigatorNov(this.userInfo.id).subscribe((res) => {
      this.dataSource = res.data;
      console.log(this.dataSource);
    });
  }

  getStatus(sub) {
    let id = sub[sub.length - 1].status_id;
    switch (id) {
      case 1:
        return 'For Initial Review of Division Chief';
      case 2:
        return 'For Signature of Department Head';
    }
  }
  getType(sub) {
    let id = sub[sub.length - 1].type_id;

    switch (id) {
      case 1:
        return 'First Notice of Violation';
      case 2:
        return 'Second Notice of Violation';
      case 3:
        return 'Third and Final Notice of Violation';
    }
  }

  handleView(id) {
    this.router.navigate(['/evaluator/nov/view', id]);
  }
}
