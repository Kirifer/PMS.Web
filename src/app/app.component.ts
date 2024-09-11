import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PMS.Web';

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router) {}

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  get isAdminLogin(): boolean{
    return this.router.url == '/login';
  }
}
