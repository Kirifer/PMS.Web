import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfReviewComponent } from './pages/perf-review/perf-review.component';

export const routes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent
    
    },
    {
        path: 'perf-rev', 
        component: PerfReviewComponent
    
    },
];
