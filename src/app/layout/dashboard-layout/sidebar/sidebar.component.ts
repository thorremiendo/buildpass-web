import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu, MenuItems } from '../../../shared/menu-items/menu-items';
import { AuthService } from 'src/app/core/services/auth.service';

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
    public menuItems: MenuItems,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
      this._isLoading = false;
    }
    if (this.userInfo.employee_detail != null) {
      this.evaluatorDetails = JSON.parse(localStorage.getItem('user'));
      this.employeeDetails = this.evaluatorDetails.employee_detail;
      this._isLoading = false;
      let office_id = this.employeeDetails.office_id;
      this.officeToString(office_id);
      this._isLoading = false;
    }
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  getItemState(state, outlet): Array<any> {
    const navigateTo = state.split('/');
    if (outlet)
      return [`/${navigateTo[0]}`, { outlets: { [outlet]: [navigateTo[1]] } }];
    else return ['/', ...navigateTo];
  }

  logout() {
    if (this.userInfo == 'treasury-cbao') {
      this._authService.treasurySignOut();
    } else if (this.employeeDetails == undefined) {
      this._authService.userSignOut();
    } else {
      this._authService.evaluatorSignOut();
    }
  }

  officeToString(officeID) {
    switch (officeID) {
      case 1:
        this.officeString = 'City Planning and Development Office';
        break;
      case 2:
        this.officeString = 'City Environment and Parks Management Office';
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
