import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Bell,
  LucideAngularModule,
  TrendingUp,
  Users,
  Target,
  Award,
} from 'lucide-angular';
import { TakeReviewComponent } from './components/take-review/take-review.component';

@Component({
  selector: 'app-emp-dashboard',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, TakeReviewComponent],
  template: `
    <div
      class="h-[calc(100vh-.75rem)] mt-3 bg-gray-50 py-6 sm:px-6 lg:px-8 rounded-tl-2xl rounded-bl-2xl"
    >
      <div class="flex flex-row justify-between">
        <div class="max-w-full px-4">
          <h1 class="text-3xl font-semibold text-gray-900 mb-6">
            Goodmorning, User!
          </h1>
          <p class="text-md text-gray-600 mt-[-20px] mb-4">
            Track, Analyze, and Optimize Performance Dashboard
          </p>
        </div>

        <div>
          <div class="relative">
            <button
              class="relative p-2 transition-all duration-200 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-300 active:scale-95"
              [class.animate-shake]="hasNewNotifications"
            >
              <i-lucide [img]="Bell" class="w-5 h-5" />
              <span
                *ngIf="notificationCount > 0"
                class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
              >
                {{ notificationCount }}
              </span>
            </button>

            <div
              *ngIf="isOpen"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
            >
              <div class="p-4 border-b border-gray-100">
                <h3 class="text-md font-semibold text-gray-900">
                  Notifications
                </h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  *ngFor="let notification of notifications"
                  class="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <p class="text-md text-gray-800">
                    {{ notification.message }}
                  </p>
                  <span class="text-xs text-gray-500">{{
                    notification.time
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-md text-gray-500">Performance Score</p>
              <h3 class="text-2xl font-bold text-gray-900">85%</h3>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <i-lucide [img]="TrendingUp" class="text-green-600" />
            </div>
          </div>
          <p class="text-xs text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-md text-gray-500">Team Ranking</p>
              <h3 class="text-2xl font-bold text-gray-900">#3</h3>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <i-lucide [img]="Users" class="text-blue-600" />
            </div>
          </div>
          <p class="text-xs text-blue-600 mt-2">Top 10% performers</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-md text-gray-500">Goals Completed</p>
              <h3 class="text-2xl font-bold text-gray-900">12/15</h3>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <i-lucide [img]="Target" class="text-purple-600" />
            </div>
          </div>
          <p class="text-xs text-purple-600 mt-2">80% completion rate</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-md text-gray-500">Achievements</p>
              <h3 class="text-2xl font-bold text-gray-900">5</h3>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <i-lucide [img]="Award" class="text-yellow-600" />
            </div>
          </div>
          <p class="text-xs text-yellow-600 mt-2">2 new this month</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">Recent Activities</h2>
          <div class="space-y-4">
            <div
              *ngFor="let activity of activities"
              class="flex items-start gap-4"
            >
              <div
                [class]="'w-2 h-2 mt-2 rounded-full ' + activity.statusColor"
              ></div>
              <div>
                <p class="text-md text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <div class="space-y-4">
            <div
              *ngFor="let task of tasks"
              class="flex items-center justify-between"
            >
              <div>
                <h3 class="text-md font-medium text-gray-900">
                  {{ task.title }}
                </h3>
                <p class="text-xs text-gray-500">Due: {{ task.dueDate }}</p>
              </div>
              <span
                [class]="'px-2 py-1 text-xs rounded-full ' + task.priorityClass"
              >
                {{ task.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button class="border border-blue-900" (click)="openTakeReviewDialog()">Take Review</button>
      <app-take-review *ngIf="isTakeReviewDialogOpen" (close)="closeTakeReviewDialog()" />
    </div>
  `,
  styles: `
  * {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  @keyframes shake {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(10deg); }
      50% { transform: rotate(0deg); }
      75% { transform: rotate(-10deg); }
      100% { transform: rotate(0deg); }
    }

    .animate-shake {
      animation: shake 0.5s ease-in-out;
    }`,
})
export class EmpDashboardComponent {
  readonly Bell = Bell;
  readonly TrendingUp = TrendingUp;
  readonly Users = Users;
  readonly Target = Target;
  readonly Award = Award;

  isTakeReviewDialogOpen = false;

  openTakeReviewDialog() {
    this.isTakeReviewDialogOpen = true;
  }

  closeTakeReviewDialog() {
    this.isTakeReviewDialogOpen = false;
  } 

  activities = [
    {
      description: 'Completed quarterly performance review',
      time: '2 hours ago',
      statusColor: 'bg-green-500',
    },
    {
      description: 'New goal assigned: Improve customer satisfaction metrics',
      time: '5 hours ago',
      statusColor: 'bg-blue-500',
    },
    {
      description: 'Achieved team collaboration milestone',
      time: '1 day ago',
      statusColor: 'bg-purple-500',
    },
    {
      description: 'Received recognition for project completion',
      time: '2 days ago',
      statusColor: 'bg-yellow-500',
    },
  ];

  tasks = [
    {
      title: 'Complete Self Assessment',
      dueDate: 'Tomorrow',
      priority: 'High',
      priorityClass: 'bg-red-100 text-red-800',
    },
    {
      title: 'Team Progress Meeting',
      dueDate: 'Wed, 10:00 AM',
      priority: 'Medium',
      priorityClass: 'bg-yellow-100 text-yellow-800',
    },
    {
      title: 'Update Goal Progress',
      dueDate: 'Next Week',
      priority: 'Low',
      priorityClass: 'bg-green-100 text-green-800',
    },
  ];

  isOpen = false;
  hasNewNotifications = true;
  notificationCount = 3;

  notifications = [
    {
      message: 'Your performance review is due tomorrow',
      time: '2 minutes ago',
    },
    {
      message: 'New goal has been assigned to you',
      time: '1 hour ago',
    },
    {
      message: 'Team meeting scheduled for tomorrow',
      time: '3 hours ago',
    },
  ];
}
