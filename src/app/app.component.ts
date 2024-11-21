import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent],
  template: `
<div class="flex h-screen">
  <!-- Side Navigation -->
  <app-side-nav></app-side-nav>

  <!-- Main Content Area -->
  <div class="flex-1 p-4 overflow-y-auto">
    <router-outlet></router-outlet>
  </div>
</div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'PMS';
}
