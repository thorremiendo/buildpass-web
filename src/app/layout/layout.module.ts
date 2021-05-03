import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DashboardLayoutModule } from './dashboard-layout/dashboard-layout.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    DashboardLayoutModule,
    SharedModule,
  ],
  exports: [DashboardLayoutComponent],
})
export class LayoutModule {}
