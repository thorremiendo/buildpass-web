import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { RegistrationRoutingModule } from './registration-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';





@NgModule({
  declarations: [
    PersonalInfoComponent, 
    RegistrationPageComponent],
    

  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,

    
  ]
})
export class RegistrationModule { }
