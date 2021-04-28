import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewApplicationFormService } from './services/new-application-form-service';
import { UserGuardService } from './guard/user-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http-interceptors.service';
import { AdminUserParamBuilder } from './http-builder';




@NgModule({
  declarations: [
],
  imports: [
    CommonModule
  ],
  
  providers: [
  {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
   NewApplicationFormService,
   UserGuardService,
   AdminUserParamBuilder,
  ],

 

  
 
})
export class CoreModule { }
