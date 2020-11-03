import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewApplicationFormService } from './services/new-application-form-service';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  providers: [
    // Services
   NewApplicationFormService
  ],
 
})
export class CoreModule { }
