import { Routes } from '@angular/router';
import { DashboardComponent } from './module/admin/dashboard/dashboard.component';
import { PerformanceReviewComponent } from './module/admin/perf-review/perf-review.component';
import { UsersComponent } from './module/admin/users/users.component';
import { LoginComponent } from './module/auth/login/login.component';

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
    path: 'login',
    component: LoginComponent,
  },
];
