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
            label: 'Lot Owner Details',
            link: './lot-owner',
            index: 0
        }, 
        {
            label: 'Project Details',
            link: './project-site',
            index: 1
        },
        {
          label: 'Representative Details',
          link: './representative',
          index: 2
      },

    ];


}


  ngOnInit(): void {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this._router.url));
  });

  }

}
