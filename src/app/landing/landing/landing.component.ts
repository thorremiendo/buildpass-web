import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  panelOpenState = false;

  constructor(
    private router: Router,
    private meta: Meta,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn){
      console.log('yes')
    } else {
      console.log('not')
    }
      this.meta.addTag({
        property: 'og:title',
        content: 'BuildPASS',
      });
    this.meta.addTag({
      property: 'og:url',
      content: 'https://buildpass.baguio.gov.ph/',
    });
    this.meta.addTag({
      property: 'og:description',
      content:
        'Introducing the newest innovation of the Local Government Unit of Baguio to improve the application of Building Permit and Certificates of Occupancy. The aim of this system is to lessen the processing time and provide a one-stop-shop online and minimize interaction between client and government entities.',
    });

    this.meta.updateTag({ property: 'og:title', content: 'BuildPASS' });

    this.meta.updateTag({
      property: 'og:url',
      content: 'https://buildpass.baguio.gov.ph/',
    });
  }
  goToServices() {
    this.router.navigateByUrl('/services');
  }
}
