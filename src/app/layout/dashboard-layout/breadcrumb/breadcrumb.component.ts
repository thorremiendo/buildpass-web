import { Component, OnInit, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



import { ApplicationInfoService } from 'src/app/core/services/application-info.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class BreadcrumbComponent implements OnInit {
  pageInfo: Data = Object.create(null);
  version: String;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public _applicationInfoService: ApplicationInfoService,

    
  ) {
   
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
  }

  ngOnInit(): void{
    this.version = environment.version;
   
  }
  
 
 
}

 


