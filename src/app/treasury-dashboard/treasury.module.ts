import { EvaluatorModule } from './../evaluator-dashboard/evaluator-dashboard.module';
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
import { TreasuryApplicationPageComponent } from './treasury-application-page/treasury-application-page.component';
import { MatTableModule } from '@angular/material/table';
import { TreasuryPaymentDialogComponent } from './treasury-payment-dialog/treasury-payment-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [
    TreasurySignInComponent,
    TreasuryHomeComponent,
    TreasuryApplicationPageComponent,
    TreasuryPaymentDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
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
    EvaluatorModule,
    MatTableModule,
  ],

  providers: [TreasuryRoutingModule],
})
export class TreasuryModule {}
