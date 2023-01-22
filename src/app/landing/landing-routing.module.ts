import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'maintenance',
    component: ErrorPageComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'user',
    component: SignInUpComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  // { path: '**', redirectTo: 'maintenance' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
