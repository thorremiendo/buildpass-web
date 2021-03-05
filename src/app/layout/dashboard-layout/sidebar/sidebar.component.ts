import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Menu, MenuItems } from '../../../shared/menu-items/menu-items';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() public type: string;

  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  status = true;

  public userInfo;
  public evaluatorDetails;
  public employeeDetails;
  public officeString: string;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;
  _isLoading: boolean = true;

  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }

  get items(): Menu[] {
    return this.menuItems.getMenuitem(this.type);
  }
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {
    //this.userInfo = JSON.parse(localStorage.getItem('user'));

    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this._userService.cast.subscribe((userSubject) => {
      this.userInfo = userSubject;
      if (localStorage.getItem('currentUser')) {
        this.evaluatorDetails = JSON.parse(localStorage.getItem('currentUser'));
        this.employeeDetails = this.evaluatorDetails.employee_detail;
        let office_id = this.employeeDetails.office_id;
        this.officeToString(office_id);
      }
      this._isLoading = false;
    });
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  getItemState(state): Array<string> {
    const navigateTo = state.split('/');

    return ['/', ...navigateTo];
  }

  logout() {
    if (this.employeeDetails == null) {
      this._authService.userSignOut();
    } else this._authService.evaluatorSignOut();
  }

  officeToString(officeID) {
    

    switch (officeID) {
      case 1:
        this.officeString = 'City Planning and Development Office';
        break;
      case 2:
        this.officeString = 'City Environment and Park Office';
        break;
      case 3:
        this.officeString = 'Bureau of Fire Protection';
        break;
      case 4:
        this.officeString = 'City Buildings and Architecture Office';
        break;
      case 5:
        this.officeString = 'Assessors Office';
        break;
    }
  }
}
