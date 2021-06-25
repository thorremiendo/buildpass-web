import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreasuryDashboardRoutingModule } from './treasury-dashboard-layout.routing.module';
import { DashboardLayoutModule } from 'src/app/layout/dashboard-layout/dashboard-layout.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    CommonModule,
    CoreModule,
    LayoutModule,
    RouterModule,
    DashboardLayoutModule,
    TreasuryDashboardRoutingModule,
  ],
})
export class TreasuryDashboardModule {}
