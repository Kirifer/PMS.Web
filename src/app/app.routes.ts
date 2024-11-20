import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { PerformRevComponent } from './pages/perform-rev/perform-rev.component';


export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'dashboard', 
        component: DashboardComponent
    
    },
    {
        path: 'login', 
        component: LoginComponent
    }
        ,
    {
        path: 'performance',
        component: PerformRevComponent
    }
];
