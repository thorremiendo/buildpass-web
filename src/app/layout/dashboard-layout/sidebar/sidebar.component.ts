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
import { MessagingService } from 'src/app/core/services/messaging.service';
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
  public officeString: string;
  public hasEvaluatorDetails: boolean = false;

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
    private _messagingService: MessagingService,
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
      debugger
      this.evaluatorDetails = this.userInfo.employee_detail;
      if (this.evaluatorDetails != null) {
        let office_id = this.evaluatorDetails.office_id;
        this.hasEvaluatorDetails = true;

        this.officeToString(office_id);
      }
      this._isLoading = false;
      console.log('User info ' + this.userInfo);
      console.log('Evaluator Info ' + this.evaluatorDetails);
    });

    this._messagingService.requestPermission();
    this._messagingService.receiveMessage();
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
    if (this.evaluatorDetails == null) {
      this._authService.userSignOut();
    } else this._authService.evaluatorSignOut();
  }

  officeToString(officeID) {
    console.log(officeID);

    switch (officeID) {
      case 1:
        this.officeString = 'City Planning and Development Office';
        console.log(this.officeString);
        break;
      case 2:
        this.officeString = 'City Environment and Park Office';
        console.log(this.officeString);
        break;
      case 3:
        this.officeString = 'Bureau of Fire Protection';
        console.log(this.officeString);
        break;
      case 4:
        this.officeString = 'City Buildings and Architecture Office';
        console.log(this.officeString);
        break;
      case 5:
        this.officeString = 'Assessors Office';
        console.log(this.officeString);
        break;
    }
  }
}
