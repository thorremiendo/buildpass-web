import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
