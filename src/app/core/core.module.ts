import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewApplicationFormService } from './services/new-application-form-service';
import { UserGuardService } from './guard/user-guard.service';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  providers: [
    // Services
   NewApplicationFormService,
   UserGuardService
  ],
 
})
export class CoreModule { }
