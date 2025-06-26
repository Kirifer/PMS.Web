import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  House,
  Users,
  Ticket,
  LogOut,
  LayoutGrid,
  User,
  Shield,
  UserCheck,
} from 'lucide-angular';

interface NavItem {
  icon: any;
  label: string;
  link: string;
  action?: () => void;
  role?: string;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, LucideAngularModule],
  template: `
    <nav
      class="h-screen bg-blue-900 text-white shadow-sm flex flex-col transition-all duration-300"
      [ngClass]="{
        'w-64': isExpanded,
        'w-20': !isExpanded
      }"
    >
      <div class="p-4 flex justify-between items-center mt-4">
        <!-- Logo Section -->
        <div
          class="flex items-center gap-2 cursor-pointer"
          (click)="toggleSidenav()"
        >
          <img
            src="images/its-icon_v1.3.png"
            alt="IT Squarehub Icon"
            class="w-auto h-8 ml-[2px]"
            [class.hidden]="isExpanded"
          />
          <img
            src="images/its-logo_v1.3-dark.png"
            alt="IT Squarehub Logo"
            class="w-full h-8"
            [class.hidden]="!isExpanded"
          />
        </div>
      </div>

      <!-- Subtitle for Expanded State -->
      <div *ngIf="isExpanded">
        <p
          class="text-xs text-gray-300 items-center justify-center ml-8 mt-[-5px]"
        >
          Performance Management System
        </p>
      </div>

      <!-- Navigation Items -->
      <div
        class="flex flex-col gap-2 mt-2 group relative"
        *ngFor="let item of currentNavItems"
      >
        <a
          [routerLink]="item.link"
          routerLinkActive="bg-blue-700 text-white border-l-4 border-blue-500"
          [routerLinkActiveOptions]="{ exact: true }"
          class="nav-item flex items-center gap-2 p-2 hover:bg-blue-700 transition-all duration-200"
          [ngClass]="{
            'justify-center': !isExpanded,
            'w-full pl-4': isExpanded
          }"
        >
          <span class="nav-icon">
            <i-lucide
              [img]="item.icon"
              class="my-icon"
              data-tooltip-target="tooltip-right"
            ></i-lucide>
          </span>
          <div
            data-tooltip="tooltip-right-end"
            data-tooltip-placement="right-end"
            class="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 hidden group-hover:flex items-center whitespace-nowrap rounded-lg bg-black px-3 py-1 text-sm text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {{ item.label }}
          </div>
          <span [class.hidden]="!isExpanded" class="text-sm font-bold">
            {{ item.label }}
          </span>
        </a>
      </div>

      <!-- Mode Switch - Above Profile -->
      <div class="flex flex-col gap-2 mt-auto mb-2">
        <div class="px-4">
          <div class="flex items-center gap-3 p-2 bg-blue-800 rounded-lg">
            <!-- Simple Switch Toggle -->
            <div
              (click)="toggleMode()"
              class="relative inline-flex h-5 w-9 items-center rounded-full cursor-pointer transition-colors duration-200"
              [ngClass]="{
                'bg-blue-600': isAdminMode,
                'bg-gray-600': !isAdminMode
              }"
            >
              <span
                class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 shadow-md"
                [ngClass]="{
                  'translate-x-5': isAdminMode,
                  'translate-x-1': !isAdminMode
                }"
              ></span>
            </div>
            
            <!-- Label -->
            <div *ngIf="isExpanded" class="flex items-center gap-2">
              <i-lucide
                [img]="isAdminMode ? this.ShieldIcon : this.UserCheckIcon"
                class="w-3 h-3"
              ></i-lucide>
              <span class="text-xs font-medium">
                {{ isAdminMode ? 'Admin' : 'Employee' }}
              </span>
            </div>
            
            <!-- Tooltip for collapsed state -->
            <div
              *ngIf="!isExpanded"
              class="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 hidden group-hover:flex items-center whitespace-nowrap rounded-lg bg-black px-2 py-1 text-xs text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {{ isAdminMode ? 'Admin Mode' : 'Employee Mode' }}
            </div>
          </div>
        </div>
      </div>

      <!-- User Profile and Logout Section as Navigation Items -->
      <div class="flex flex-col gap-2 mb-4">
        <a
          [routerLink]=""
          class="nav-item flex items-center gap-2 p-2 cursor-pointer"
          [ngClass]="{
            'justify-center': !isExpanded,
            'w-full pl-4': isExpanded
          }"
        >
          <img
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            class="relative inline-block h-9 w-9 !rounded-full  object-cover border-white object-center hover:border-blue-700 border-2"
          />
          <div *ngIf="isExpanded" class="text-left">
            <p class="text-sm font-bold"></p>
            <p class="text-xs text-gray-300"></p>
          </div>
        </a>
      </div>
    </nav>
  `,
  styles: [],
})
export class SideNavComponent implements OnInit {
  readonly HouseIcon = House;
  readonly UsersIcon = Users;
  readonly UserIcon = User;
  readonly TicketIcon = Ticket;
  readonly LogOutIcon = LogOut;
  readonly LayoutGridIcon = LayoutGrid;
  readonly ShieldIcon = Shield;
  readonly UserCheckIcon = UserCheck;

  isExpanded: boolean = false;
  isAdminMode: boolean = true;

  // Admin navigation items
  adminNavItems: NavItem[] = [
    { icon: this.HouseIcon, label: 'Admin Dashboard', link: 'admin/dashboard' },
    { icon: this.UsersIcon, label: 'Users', link: 'admin/users' },
    {
      icon: this.TicketIcon,
      label: 'Performance Review',
      link: 'admin/perf-rev',
    },
  ];

  // Employee navigation items
  employeeNavItems: NavItem[] = [
    {
      icon: this.LayoutGridIcon,
      label: 'Employee Dashboard',
      link: 'emp/dashboard',
    },
  ];

  // Current navigation items based on mode
  get currentNavItems(): NavItem[] {
    return this.isAdminMode ? this.adminNavItems : this.employeeNavItems;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if there is a stored state in localStorage, if not default to collapsed (false)
    const savedState = localStorage.getItem('sidenavState');
    this.isExpanded = savedState ? JSON.parse(savedState) : false;

    // Check for saved mode preference
    const savedMode = localStorage.getItem('navMode');
    this.isAdminMode = savedMode ? JSON.parse(savedMode) : true;
  }

  closeSidebar() {
    this.isExpanded = false; // Close the sidebar quickly when the mouse leaves
    localStorage.setItem('sidenavState', JSON.stringify(this.isExpanded));
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    // Save the new state to localStorage
    localStorage.setItem('sidenavState', JSON.stringify(this.isExpanded));
  }

  toggleMode() {
    this.isAdminMode = !this.isAdminMode;
    // Save the mode preference to localStorage
    localStorage.setItem('navMode', JSON.stringify(this.isAdminMode));
    
    // Navigate to the first item of the new mode
    const firstItem = this.currentNavItems[0];
    if (firstItem) {
      this.router.navigate([firstItem.link]);
    }
  }

  logout() {
    // Perform logout actions (clear session, redirect to login, etc.)
    console.log('User logged out');
    // Example: Navigate to login page
    // this.router.navigate(['/login']);
  }
}
