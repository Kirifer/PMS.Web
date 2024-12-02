import { Component } from '@angular/core';
// import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '@shared/components/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent, ReactiveFormsModule, CommonModule],
  template: `
    <div class="flex h-screen">
      <!-- Side Navigation -->
      <app-side-nav *ngIf="showSideNav" />

      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto bg-blue-900">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'PMS';
  showSideNav = true; // Controls whether the sidenav is visible

  // Routes without sidenav
  private routesWithoutSideNav: string[] = ['/login', '/register'];

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the current route is in the list
        this.showSideNav = !this.routesWithoutSideNav.includes(
          event.urlAfterRedirects
        );
      });
  }
}
