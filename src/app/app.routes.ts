import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BodyComponent } from './body/body.component';
import { PerformRevComponent } from './perform-rev/perform-rev.component';


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
