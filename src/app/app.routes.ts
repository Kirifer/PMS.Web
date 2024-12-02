import { Routes } from '@angular/router';
import { DashboardComponent } from './module/admin/dashboard/dashboard.component';
import { PerfReviewComponent } from './module/admin/perf-review/perf-review.component';
import { UsersComponent } from './module/admin/users/users.component';
import { LoginComponent } from './module/auth/login/login.component';
import { UserProfileComponent } from './module/admin/users/components/user-profile/user-profile';
import { UsersComponent2 } from './module/users copy/users.component';
import { UserDashboardComponent } from './module/users/dashboard/dashboard.component';
export const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin/perf-rev',
    component: PerfReviewComponent,
  },
  {
    path: 'admin/users',
    component: UsersComponent,
  },
  {
    path: 'admin/user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'users-2',
    component: UsersComponent2,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
  },
];
