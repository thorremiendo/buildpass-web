import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LandingComponent } from './landing/landing/landing.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { TestNotificationComponent } from './test-notification/test-notification.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'test-notification',
    component: TestNotificationComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
