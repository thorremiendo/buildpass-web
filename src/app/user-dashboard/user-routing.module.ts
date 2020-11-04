import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';
import { AuthGuard } from '../core/guard/auth.guard'


const routes: Routes = [
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      children:
       [
        {
          path: '',
          component: DashboardComponent,
          canActivate: [AuthGuard],
        },
      ],
    }
  ]

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }