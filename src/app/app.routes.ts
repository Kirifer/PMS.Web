import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfReviewComponent } from './pages/perf-review/perf-review.component';
import { TableComponent } from './components/table/table.component';

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
        path: 'table',
        component: TableComponent
    }
];
