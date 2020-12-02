import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfoComponent,
      }
    ],
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
