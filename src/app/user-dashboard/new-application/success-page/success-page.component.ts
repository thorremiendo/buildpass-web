import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
})
export class SuccessPageComponent implements OnInit {
  public applicationNumber;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.applicationNumber = this.route.snapshot.paramMap.get(
      'application_number'
    );
  }
  goToHome() {
    this.router.navigateByUrl('/dashboard/home');
  }
}
