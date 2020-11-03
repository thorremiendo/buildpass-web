import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-application-page',
  templateUrl: './new-application-page.component.html',
  styleUrls: ['./new-application-page.component.scss']
})
export class NewApplicationPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  next(){
    this.router.navigateByUrl('/dashboard/new/initial-forms')
  }

}
