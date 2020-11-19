import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { NavigationComponent } from '../landing/navigation/navigation.component';
import { BannerComponent } from '../landing/banner/banner.component';


const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";


@Component({
  selector: 'app-sign-in-up-page',
  templateUrl: './sign-in-up-page.component.html',
  styleUrls: ['./sign-in-up-page.component.scss']
})
export class SignInUpPageComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(
    private _router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon("logo",
    this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    
    this.navLinks = [
        {
            label: 'Sign in',
            link: './sign-in',
            index: 0
        }, {
            label: 'Sign up',
            link: './sign-up',
            index: 1
        },
    ];


}


  ngOnInit(): void {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this._router.url));
  });

  }

}
