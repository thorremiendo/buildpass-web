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

  public user;
  public evaluatorDetails;
  
  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

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
    private authService: AuthService,
    private _messagingService: MessagingService,
    private _userService: UserService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.authService.getFireBaseData(this.user.uid).subscribe(result =>{
      this.evaluatorDetails = result.data();
      console.log(this.evaluatorDetails)
    })
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    // this.authService.currentUser.subscribe((currentUser) => {
    //   this.user = currentUser;
    //   console.log("user"+JSON.stringify(this.user));
    //   this.authService.getFireBaseData(this.user.user.uid).subscribe(result =>{
    //     this.evaluatorDetails = result.data();
    //     console.log(this.evaluatorDetails)
    //   })
    // });
    this.getUserInfo();
    this._messagingService.requestPermission()
    this._messagingService.receiveMessage()
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  getItemState(state): Array<string> {
    const navigateTo = state.split('/');

    return ['/', ...navigateTo];
  }

  getUserInfo() {
    this._userService.getUserInfo(this.user.uid).subscribe((data) => {
      this._userService.setUserInfo(data);
      console.log('ger user' + data);
    });
  }

  logout() {
    this.authService.SignOut();

  }
}
