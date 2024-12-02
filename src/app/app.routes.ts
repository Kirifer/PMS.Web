import { Routes } from '@angular/router';
// Admin Pages
import { DashboardComponent } from './module/admin/dashboard/dashboard.component';
import { UsersComponent } from './module/admin/users/users.component';
import { PerfReviewComponent } from './module/admin/perf-review/perf-review.component';
import { UserProfileComponent } from './module/admin/users/components/user-profile/user-profile';

// Auth Pages
import { LoginComponent } from './module/auth/login/login.component';

// User Pages
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
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
  },
];
