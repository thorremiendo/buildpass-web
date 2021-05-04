import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluatorAuthGuard } from '../core/guard/evaluator-guard';
import { TreasurySignInComponent } from './treasury-sign-in/treasury-sign-in.component';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'treasury',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [EvaluatorAuthGuard],
      },

      {
        path: 'sign-in',
        component: TreasurySignInComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TreasuryRoutingModule {}
