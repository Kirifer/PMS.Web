import { Routes } from '@angular/router';
import { DashboardComponent } from './module/admin/dashboard/dashboard.component';
import { PerformanceReviewComponent } from './module/admin/perf-review/perf-review.component';
import { UsersComponent } from './module/admin/users/users.component';
import { LoginComponent } from './module/auth/login/login.component';
import { EmpDashboardComponent } from './module/employee/emp-dashboard/emp-dashboard.component';
import { PageNotFoundComponent } from './module/shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin/perf-rev',
    component: PerformanceReviewComponent,
  },
  {
    path: 'admin/users',
    component: UsersComponent,
  },
  {
    path: 'emp/dashboard',
    component: EmpDashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**',
    component: PageNotFoundComponent
   },
];
