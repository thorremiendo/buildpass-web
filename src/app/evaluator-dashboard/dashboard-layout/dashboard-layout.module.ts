import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EvaluatorDashboardRoutingModule } from './evaluator-dashboard-routing.module';
import { DashboardLayoutModule } from 'src/app/layout/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
//import { DateAgoPipe } from '../../core'



@NgModule({
  declarations: [DashboardComponent, 
    //DateAgoPipe,
  ],
  imports: [
    CommonModule,
    EvaluatorDashboardRoutingModule,
    DashboardLayoutModule,
    RouterModule,
    SharedModule,
    CoreModule,
    
    
  ]
})
export class EvaluatorDashboardModule { }
