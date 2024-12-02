import { Routes } from '@angular/router';
import { DashboardComponent } from './module/admin/dashboard/dashboard.component';
import { PerfReviewComponent } from './module/admin/perf-review/perf-review.component';
import { UsersComponent } from './module/admin/users/users.component';
import { LoginComponent } from './module/login/login.component';
import { PerfReviewComponent2 } from './module/perf-review copy/perf-review.component';
import { UserProfileComponent } from './module/admin/users/components/user-profile/user-profile';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'perf-rev',
    component: PerfReviewComponent,
  },  {
    path: 'perf-rev-2',
    component: PerfReviewComponent2,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
