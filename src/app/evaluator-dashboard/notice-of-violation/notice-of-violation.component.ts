import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NoticeOfViolationService } from 'src/app/core/services/notice-of-violation.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notice-of-violation',
  templateUrl: './notice-of-violation.component.html',
  styleUrls: ['./notice-of-violation.component.scss'],
})
export class NoticeOfViolationComponent implements OnInit {
  userInfo;
  displayedColumns: string[] = ['name', 'status', 'type', 'action'];
  novs;
  filteredNovs;
  userRole: string;
  searchValue = new FormControl();
  constructor(private nov: NoticeOfViolationService, private router: Router) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.userRole = this.userInfo.user_roles[0].role[0].code;
    this.searchValue.valueChanges.pipe(debounceTime(1000)).subscribe((key) => {
      console.log(key);
      this.handleSearch(key);
    });
    if (this.userRole == 'INV-DC' || this.userRole == 'CBAO-BO') {
      this.nov.getAllNovs().subscribe((res) => {
        console.log(res);
        this.novs = res.data.filter((e) => e.sub_detail.length !== 0);
        this.filteredNovs = this.novs;
      });
    } else {
      this.nov.getInvestigatorNov(this.userInfo.id).subscribe((res) => {
        this.novs = res.data.filter((e) => e.sub_detail.length !== 0);
        this.filteredNovs = this.novs;
        console.log(this.novs);
      });
    }
  }

  handleSearch(e) {
    const results = this.novs.filter((obj) => {
      return Object.keys(obj).reduce((acc, curr) => {
        if (typeof obj[curr] == 'string') {
          console.log(obj[curr]);
          return acc || obj[curr].toLowerCase().includes(e);
        }
      }, false);
    });
    console.log(results);
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
