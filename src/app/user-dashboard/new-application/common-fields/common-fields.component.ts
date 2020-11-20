import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-common-fields',
  templateUrl: './common-fields.component.html',
  styleUrls: ['./common-fields.component.scss']
})
export class CommonFieldsComponent implements OnInit {
  
  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(
    private _router: Router) 

    {

    this.navLinks = [
        {
            label: 'Personal Info',
            link: './personal-info',
            index: 0
        }, 
        {
            label: 'Address Info',
            link: './address-info',
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
