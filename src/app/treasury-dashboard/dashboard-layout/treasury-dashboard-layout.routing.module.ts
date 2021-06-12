import { ApplicationDetailsComponent } from 'src/app/evaluator-dashboard/application-details/application-details.component';
import { TreasuryAuthGuard } from './../treasury-guard';
import { TreasuryHomeComponent } from './../treasury-home/treasury-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'treasury/dashboard',
    component: DashboardComponent,
    canActivate: [TreasuryAuthGuard],
    children: [
      {
        path: 'home',
        component: TreasuryHomeComponent,
      },
      {
        path: 'application/:id',
        component: ApplicationDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TreasuryDashboardRoutingModule {}
