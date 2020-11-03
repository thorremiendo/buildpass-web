import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StepOneComponent } from '../new-application/step-one/step-one.component';
import { InitialFormsComponent } from '../new-application/initial-forms/initial-forms.component';
import { NewApplicationPageComponent } from '../new-application/new-application-page/new-application-page.component';
import { NewApplicationRouterComponent } from '../new-application/new-application-router/new-application-router.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [DashboardComponent, UserHomeComponent, NewApplicationPageComponent, NewApplicationRouterComponent],
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
    CoreModule
    
  ]
})
export class UserDashboardModule { }
