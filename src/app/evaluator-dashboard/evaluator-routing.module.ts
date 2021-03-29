import { UserGuardGuard } from './../core/guard/user-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';
import { EvaluatorEmployeeInfoComponent } from './evaluator-employee-info/evaluator-employee-info.component';
import { EvaluatorPersonalInfoComponent } from './evaluator-personal-info/evaluator-personal-info.component';
import { EvaluatorRegistrationComponent } from './evaluator-registration/evaluator-registration.component';
import { EvaluatorSignInComponent } from './evaluator-sign-in/evaluator-sign-in.component';
import { EvaluatorSignUpComponent } from './evaluator-sing-up/evaluator-sign-up.component';
import { EvaluatorsSummaryComponent } from './evaluators-summary/evaluators-summary.component';
import { EvaluatorAuthGuard } from '../core/guard/evaluator-guard';
import { UserGuardService } from '../core/guard/user-guard.service';
import { EvaluatorIdentificationComponent } from './evaluator-identification/evaluator-identification.component';

const routes: Routes = [
  {
    path: 'evaluator',
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [UserGuardGuard],
      },

      {
        path: 'sign-in',
        component: EvaluatorSignInComponent,
      },

      {
        path: 'sign-up',
        component: EvaluatorSignUpComponent,
      },

      {
        path: 'registration',
        component: EvaluatorRegistrationComponent,
        children: [
          {
            path: 'personal-info',
            component: EvaluatorPersonalInfoComponent,
          },

          {
            path: 'employee-info',
            component: EvaluatorEmployeeInfoComponent,
          },

          {
            path: 'identification-info',
            component: EvaluatorIdentificationComponent,
          },

          {
            path: 'summary',
            component: EvaluatorsSummaryComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class EvaluatorRoutingModule {}
