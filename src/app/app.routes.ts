import { Routes } from '@angular/router';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { PerfReviewComponent } from './module/perf-review/perf-review.component';
import { UsersComponent } from './module/users/users.component';
import { LoginComponent } from './module/login/login.component';
import { PerfReviewComponent2 } from './module/perf-review copy/perf-review.component';
import { UserProfileComponent } from './module/users/components/user-profile/user-profile';
import { UsersComponent2 } from './module/users copy/users.component';
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
