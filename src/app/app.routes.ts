import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfReviewComponent } from './pages/perf-review/perf-review.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfReviewComponent2 } from './pages/perf-review copy/perf-review.component';
import { UserProfileComponent } from './pages/users/components/user-profile/user-profile';
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
