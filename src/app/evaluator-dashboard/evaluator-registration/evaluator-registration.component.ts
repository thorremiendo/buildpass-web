import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';


const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";


@Component({
  selector: 'app-evaluator-registration',
  templateUrl: './evaluator-registration.component.html',
  styleUrls: ['./evaluator-registration.component.scss']
})
export class EvaluatorRegistrationComponent implements OnInit {

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
            label: 'Personal Info',
            link: './personal-info',
            index: 0
        }, 
        {
            label: 'Employee Info',
            link: './employee-info',
            index: 1
        },
        {
          label: 'Identification',
          link: './identification-info',
          index: 2
      },
        {
          label: 'Summary',
          link: './summary',
          index: 3
      },
    ];


}


  ngOnInit(): void {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this._router.url));
  });

  }

}
