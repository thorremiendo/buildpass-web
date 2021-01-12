import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewApplicationFormService } from './services/new-application-form-service';
import { UserGuardService } from './guard/user-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminUserParamBuilder } from './http-builder';
import { DateAgoPipe } from './pipes/date-ago.pipe';



@NgModule({
  declarations: [
],
  imports: [
    CommonModule
  ],
  
  providers: [
    // Services
   NewApplicationFormService,
   UserGuardService,
   AdminUserParamBuilder,
  ],

 

  
 
})
export class CoreModule { }
