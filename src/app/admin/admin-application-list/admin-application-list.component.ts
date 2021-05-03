import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../core';




@Component({
  selector: 'app-admin-application-list',
  templateUrl: './admin-application-list.component.html',
  styleUrls: ['./admin-application-list.component.scss']
})
export class AdminApplicationListComponent implements OnInit {
  public applications;
  

  constructor(
    private router: Router,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.adminService.fetchAllApplication().subscribe((data) => {      
      this.applications = data.data;
    });
  }

  viewApplication(id){
   
      this.router.navigate(['admin/dashboard/application', id]);
    
  }
}
