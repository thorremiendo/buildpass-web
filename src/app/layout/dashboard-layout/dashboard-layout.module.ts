import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardLayoutComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatListModule } from '@angular/material/list';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material-module';
import { DashboardComponentsModule } from 'src/app/dashboard-components/dashboard-components.module';



@NgModule({
  declarations: [
    SidebarComponent, 
    DashboardLayoutComponent, BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    CdkAccordionModule,
    RouterModule,
    MatCardModule,
    MatBadgeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    DashboardComponentsModule,

    MaterialModule,
  
  ],
  exports: [
    DashboardLayoutComponent
  ]
})
export class DashboardLayoutModule { }
