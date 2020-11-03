import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationPageComponent} from './registration/registration-page/registration-page.component';
import { SignInUpPageComponent } from './sign-in-up-page/sign-in-up-page.component';
import { SignInComponent} from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestComponentComponent } from './test-component/test-component.component';

import { AuthGuard } from './core/guard/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [

  {
    path: 'test',
    component:TestComponentComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'sign-in-up',
    component:SignInUpPageComponent,

    children:[
      {
        path: 'sign-in',
        component:SignInComponent,
    
      },
    
      {
        path: 'sign-up',
        component:SignUpComponent,
    
      },
    

    ]

  },

  {
    path: 'forgot-password',
    component:ForgotPasswordComponent,
  },

  {
    path: 'verify-email',
    component: VerifyEmailComponent, 
  },

  {
    path: 'registration',
    component: RegistrationPageComponent, 
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
