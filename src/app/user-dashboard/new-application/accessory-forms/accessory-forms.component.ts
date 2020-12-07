import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessory-forms',
  templateUrl: './accessory-forms.component.html',
  styleUrls: ['./accessory-forms.component.scss']
})
export class AccessoryFormsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  callNext(){
    this.router.navigateByUrl('/dashboard/new/initial-forms/zoning-clearance')
  }

}
