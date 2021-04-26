import '../../../polyfills';

import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardLayoutModule } from '../../layout/dashboard-layout/dashboard-layout.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StepOneComponent } from '../new-application/step-one/step-one.component';
import { NewApplicationPageComponent } from '../new-application/new-application-page/new-application-page.component';
import { NewApplicationRouterComponent } from '../new-application/new-application-router/new-application-router.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { CommonFieldsComponent } from '../new-application/common-fields/common-fields-home/common-fields.component';
import { CommonFieldsPersonalInfoComponent } from '../new-application/common-fields/common-fields-personal-info/common-fields-personal-info.component';
import { CommonFieldsAddressInfoComponent } from '../new-application/common-fields/common-fields-address-info/common-fields-address-info.component';
import { CommonFieldsRepresentativeComponent } from '../new-application/common-fields/common-fields-representative/common-fields-representative.component';
import { environment } from '../../../environments/environment';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { LocaleCurrencyInputModule } from 'locale-currency-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponentsModule } from 'src/app/dashboard-components/dashboard-components.module';
import { MaterialModule } from 'src/app/material-module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from '../user-dashboard.module';
import { NgxDropzoneModule } from 'ngx-dropzone';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    DashboardComponent,
    UserHomeComponent,
    NewApplicationPageComponent,
    NewApplicationRouterComponent,
    CommonFieldsComponent,
    CommonFieldsPersonalInfoComponent,
    CommonFieldsAddressInfoComponent,
    CommonFieldsRepresentativeComponent,
  ],

  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    DashboardLayoutModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    CoreModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken,
    }),
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatBadgeModule,
    LocaleCurrencyInputModule,
    MatProgressSpinnerModule,
    DashboardComponentsModule,
    MaterialModule,
    PerfectScrollbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
  ],

  providers: [
    CurrencyPipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class UserDashboardModule {}
