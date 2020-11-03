import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
