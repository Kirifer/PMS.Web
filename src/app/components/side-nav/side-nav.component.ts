import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { LucideAngularModule, House, Users, Ticket } from 'lucide-angular';

interface NavItem {
  icon: any; // Type for dynamic component
  label: string;
  link: string;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule], // Include CommonModule
  template: `
    <nav
      class="h-screen bg-blue-900 text-white border-r shadow-sm transition-all duration-100 rounded-tr-2xl rounded-br-2xl"
      [class.w-64]="isExpanded"
      [class.w-20]="!isExpanded"
    >
      <div class="p-4 flex justify-between items-center">
        <!-- Logo and Title Section for Expanded State -->
        <div
          class="flex items-center gap-2 cursor-pointer"
          (click)="toggleSidenav()"
        >
          <img
            src="images/logo.png"
            alt="IT Squarehub Logo"
            class="w-10 h-10 rounded-full"
          />
          <h1 class="font-bold text-xl ml-2" *ngIf="isExpanded">
            IT Squarehub
          </h1>
        </div>

        <!-- Toggle Button for Collapsed State -->
        <ng-template #collapsedLogo>
          <div
            class="flex items-center gap-2"
            [ngClass]="{ 'ml-4': !isExpanded }"
          >
            <img
              src="images/logo.png"
              alt="IT Squarehub Logo"
              class="w-8 h-8 rounded-full"
            />
          </div>
        </ng-template>
      </div>

      <!-- Subtitle for Expanded State -->
      <div *ngIf="isExpanded">
        <p
          class="text-xs text-gray-300 items-center justify-center ml-8 mt-[-15px]"
        >
          Performance Management System
        </p>
      </div>

      <!-- Navigation Items -->
      <div class="flex flex-col gap-2 mt-4">
        <a
          *ngFor="let item of navItems"
          [routerLink]="item.link"
          class="nav-item flex items-center gap-2 p-2 hover:bg-blue-950 rounded-lg transition-all duration-300"
          [ngClass]="{
            'justify-center': !isExpanded,
            'pl-4': isExpanded
          }"
        >
          <span class="nav-icon">
            <i-lucide [img]="item.icon" class="my-icon"></i-lucide>
          </span>
          <span
            [class.hidden]="!isExpanded"
            class="text-sm font-bold transition-opacity duration-200"
          >
            {{ item.label }}
          </span>
        </a>
      </div>
    </nav>
  `,
  styles: [],
})
export class SideNavComponent implements OnInit {
  readonly HouseIcon = House;
  readonly UsersIcon = Users;
  readonly TicketIcon = Ticket;

  isExpanded: boolean = false;

  // Navigation items
  navItems: NavItem[] = [
    { icon: this.HouseIcon, label: 'Home', link: '/dashboard' },
    { icon: this.UsersIcon, label: 'Users', link: '/users' },
    { icon: this.TicketIcon, label: 'Performance Review', link: '/perf-rev' },
    { icon: this.TicketIcon, label: 'Performance Review 2', link: '/perf-rev-2' },
  ];

  ngOnInit() {
    // Check if there is a stored state in localStorage, if not default to collapsed (false)
    const savedState = localStorage.getItem('sidenavState');
    this.isExpanded = savedState ? JSON.parse(savedState) : false;
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    // Save the new state to localStorage
    localStorage.setItem('sidenavState', JSON.stringify(this.isExpanded));
  }
}
