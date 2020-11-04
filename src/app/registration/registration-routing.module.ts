import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { MAT_DATE_RANGE_INPUT_PARENT } from '@angular/material/datepicker/date-range-input-parts';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';


const routes: Routes = [
 

  {
    path: 'registration',
    component: RegistrationPageComponent,

    children: [
        {
            path: 'personal-info',
            component: PersonalInfoComponent,

        },

        {
          path: 'address',
          component: AddressComponent,

      }],
    
  },
  {
    path: 'data-privacy',
    component: DataPrivacyComponent,

  }

    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
