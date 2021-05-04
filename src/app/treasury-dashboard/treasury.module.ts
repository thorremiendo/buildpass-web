import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutModule } from '../layout/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { TreasuryRoutingModule } from './treasury-routing.service';
import { TreasuryDashboardRoutingModule } from './dashboard-layout/treasury-dashboard-layout.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '../layout/layout.module';
import { TreasuryDashboardModule } from './dashboard-layout/dashboard-layout.module';
import { MaterialModule } from '../material-module';
import { TreasurySignInComponent } from './treasury-sign-in/treasury-sign-in.component';
import { TreasuryHomeComponent } from './treasury-home/treasury-home.component';

@NgModule({
  declarations: [TreasurySignInComponent, TreasuryHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    DashboardLayoutModule,
    RouterModule,
    LayoutModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    TreasuryRoutingModule,
    TreasuryDashboardRoutingModule,
    TreasuryDashboardModule,
    MaterialModule,
  ],

  providers: [TreasuryRoutingModule],
})
export class TreasuryModule {}
