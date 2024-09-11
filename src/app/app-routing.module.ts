import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginSigninComponent } from './login-signin/login-signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerformRevComponent } from './perform-rev/perform-rev.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginSigninComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'performance',
    component: PerformRevComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
