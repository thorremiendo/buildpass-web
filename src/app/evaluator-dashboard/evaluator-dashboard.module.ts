import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluatorRoutingModule } from './evaluator-routing.module';
import { EvaluatorHomeComponent } from './evaluator-home/evaluator-home.component';
import { NewTasksComponent } from './new-tasks/new-tasks.component';
import { OpenedTasksComponent } from './opened-tasks/opened-tasks.component';
import { ClosedTasksComponent } from './closed-tasks/closed-tasks.component';
import { EvaluatorDashboardRoutingModule } from './dashboard-layout/evaluator-dashboard-routing.module';
import { EvaluatorDashboardModule } from './dashboard-layout/dashboard-layout.module';
import { DashboardLayoutModule } from '../layout/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '../layout/layout.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { TableViewComponent } from './table-view/table-view.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { EvaluatorRegistrationComponent } from './evaluator-registration/evaluator-registration.component';
import { EvaluatorSignInComponent } from './evaluator-sign-in/evaluator-sign-in.component';
import { EvaluatorSignUpComponent } from './evaluator-sing-up/evaluator-sign-up.component';
import { EvaluatorPersonalInfoComponent } from './evaluator-personal-info/evaluator-personal-info.component';
import { EvaluatorEmployeeInfoComponent } from './evaluator-employee-info/evaluator-employee-info.component';
import { EvaluatorsSummaryComponent } from './evaluators-summary/evaluators-summary.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MatExpansionModule} from '@angular/material/expansion';
import { EvaluatorIdentificationComponent } from './evaluator-identification/evaluator-identification.component';
import { EvaluatorEditProfileComponent } from './evaluator-edit-profile/evaluator-edit-profile.component';



@NgModule({
  declarations: 
  [
    EvaluatorHomeComponent,
    NewTasksComponent, 
    OpenedTasksComponent, 
    ClosedTasksComponent, 
    TableViewComponent, 
    CalendarViewComponent, 
    ApplicationDetailsComponent, 
    EvaluatorRegistrationComponent, 
    EvaluatorSignInComponent, 
    EvaluatorSignUpComponent, 
    EvaluatorPersonalInfoComponent, 
    EvaluatorEmployeeInfoComponent, 
    EvaluatorsSummaryComponent, EvaluatorIdentificationComponent, EvaluatorEditProfileComponent],

  imports: [
    CommonModule,
    EvaluatorRoutingModule,
    EvaluatorDashboardRoutingModule,
    EvaluatorDashboardModule,
    DashboardLayoutModule,
    RouterModule,
    SharedModule,
    BrowserModule,
    LayoutModule,
    CoreModule,
    ReactiveFormsModule,
    NgxDropzoneModule,

    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatRippleModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    NgxExtendedPdfViewerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    
  ]
})
export class EvaluatorModule { }
