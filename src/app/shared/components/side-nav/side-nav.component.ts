import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  House,
  Users,
  Ticket,
  LogOut,
  User,
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
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <nav
      class="h-screen bg-blue-900 text-white border-r shadow-sm rounded-tr-2xl rounded-br-2xl flex flex-col transition-all ease-in-out duration-200"
      [ngClass]="{
        'w-64': isExpanded,
        'w-20': !isExpanded
      }"
      (mouseenter)="isExpanded = true"
      (mouseleave)="closeSidebar()"
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
          <h1
            class="font-bold text-xl ml-2 transition-opacity duration-200"
            *ngIf="isExpanded"
          >
            IT Squarehub
          </h1>
        </div>
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
          class="nav-item flex items-center gap-2 p-2 hover:bg-blue-950  transition-all ease-in-out duration-300"
          [ngClass]="{
            'justify-center': !isExpanded,
            'w-full pl-4': isExpanded
          }"
        >
          <span class="nav-icon">
            <i-lucide [img]="item.icon" class="my-icon"></i-lucide>
          </span>
          <span
            [class.hidden]="!isExpanded"
            class="text-sm font-bold transition-opacity duration-200 ease-in-out"
          >
            {{ item.label }}
          </span>
        </a>
      </div>

      <!-- User Profile and Logout Section as Navigation Items -->
      <div class="flex flex-col gap-2 mt-auto border-t border-gray-400">
        <a
          *ngFor="let item of userActions"
          [routerLink]="item.link"
          class="nav-item flex items-center gap-2 p-2 cursor-pointer hover:bg-blue-950  transition-all ease-in-out duration-300"
          [ngClass]="{
            'justify-center': !isExpanded,
            'w-full pl-4': isExpanded
          }"
          (click)="item.action ? item.action() : null"
        >
          <i-lucide [img]="item.icon" class="w-6 h-6"></i-lucide>
          <div *ngIf="isExpanded" class="text-left">
            <p class="text-sm font-bold">
              {{ item.label }}
            </p>
            <p class="text-xs text-gray-300">
              {{ item.role }}
            </p>
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

  isExpanded: boolean = false;

  // Navigation items
  navItems: NavItem[] = [
    { icon: this.HouseIcon, label: 'Home', link: '/dashboard' },
    { icon: this.UsersIcon, label: 'Users', link: '/users' },
    { icon: this.TicketIcon, label: 'Performance Review', link: '/perf-rev' },
  ];

  userActions: NavItem[] = [
    {
      icon: this.UserIcon,
      label: 'John Doe',
      role: 'Administrator',
      link: '/user-profile',
    },
    {
      icon: this.LogOutIcon,
      label: 'Logout',
      link: '',
      action: () => this.logout(),
    },
  ];

  // LogoutIcon: LucideIconData|undefined;

  ngOnInit() {
    // Check if there is a stored state in localStorage, if not default to collapsed (false)
    const savedState = localStorage.getItem('sidenavState');
    this.isExpanded = savedState ? JSON.parse(savedState) : false;
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

  logout() {
    // Perform logout actions (clear session, redirect to login, etc.)
    console.log('User logged out');
    // Example: Navigate to login page
    // this.router.navigate(['/login']);
  }
}
