import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfReviewComponent } from './pages/perf-review/perf-review.component';
import { UsersComponent } from './pages/users/users.component';
import { PerfReviewComponent2 } from './pages/perf-review-copy/perf-review.component';

export const routes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent
    
    },
    {
        path: 'perf-rev', 
        component: PerfReviewComponent
    
    },
    {
        path: 'users', 
        component: UsersComponent
    
    },
    {
        path: 'perf-rev-2',
        component: PerfReviewComponent2
    }

];
