import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Bell,
  LucideAngularModule,
  TrendingUp,
  Users,
  Target,
  Award,
  Activity,
  Calendar,
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
                  <span class="text-xs text-gray-500 mt-1 block">{{ notification.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Performance Score</p>
              <h3 class="text-3xl font-bold text-gray-900 mt-2">85%</h3>
              <div class="flex items-center mt-2">
                <span class="text-sm text-green-600 font-medium">↑ 12%</span>
                <span class="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div class="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-xl">
              <i-lucide [img]="TrendingUp" class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Team Ranking</p>
              <h3 class="text-3xl font-bold text-gray-900 mt-2">#3</h3>
              <div class="flex items-center mt-2">
                <span class="text-sm text-blue-600 font-medium">Top 10%</span>
                <span class="text-sm text-gray-500 ml-1">performers</span>
              </div>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-xl">
              <i-lucide [img]="Users" class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Goals Completed</p>
              <h3 class="text-3xl font-bold text-gray-900 mt-2">12/15</h3>
              <div class="flex items-center mt-2">
                <span class="text-sm text-purple-600 font-medium">80%</span>
                <span class="text-sm text-gray-500 ml-1">completion rate</span>
              </div>
            </div>
            <div class="bg-gradient-to-br from-purple-400 to-purple-600 p-4 rounded-xl">
              <i-lucide [img]="Target" class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Achievements</p>
              <h3 class="text-3xl font-bold text-gray-900 mt-2">5</h3>
              <div class="flex items-center mt-2">
                <span class="text-sm text-yellow-600 font-medium">2 new</span>
                <span class="text-sm text-gray-500 ml-1">this month</span>
              </div>
            </div>
            <div class="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-xl">
              <i-lucide [img]="Award" class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Recent Activities</h2>
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <i-lucide [img]="Activity" class="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div class="space-y-4">
            <div *ngFor="let activity of activities" class="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div [class]="'w-3 h-3 mt-2 rounded-full ' + activity.statusColor"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <i-lucide [img]="Calendar" class="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div class="space-y-4">
            <div *ngFor="let task of tasks" class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div>
                <h3 class="text-md font-medium text-gray-900">
                  {{ task.title }}
                </h3>
                <p class="text-xs text-gray-500">Due: {{ task.dueDate }}</p>
              </div>
              <span [class]="'px-2 py-1 text-xs rounded-full ' + task.priorityClass">
                {{ task.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-10">
        <button
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          (click)="openTakeReviewDialog()"
        >
          <i-lucide [img]="Target" class="w-5 h-5 mr-2" />
          Take Review
        </button>
      </div>

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
      animation: shake 0.5s;
    }`,
})
export class EmpDashboardComponent {
  readonly Bell = Bell;
  readonly TrendingUp = TrendingUp;
  readonly Users = Users;
  readonly Target = Target;
  readonly Award = Award;
  readonly Activity = Activity;
  readonly Calendar = Calendar;

  isTakeReviewDialogOpen = false;
  isOpen = false;
  hasNewNotifications = true;
  notificationCount = 3;

  activities = [
    { description: 'Completed Q2 goals review', time: '2 hours ago', statusColor: 'bg-green-500' },
    { description: 'Manager commented on your performance', time: '1 day ago', statusColor: 'bg-blue-500' },
    { description: 'New goal assigned', time: '3 days ago', statusColor: 'bg-yellow-500' },
  ];

  tasks = [
    { title: 'Submit self-assessment', dueDate: '2024-06-10', priority: 'High', priorityClass: 'bg-red-100 text-red-700' },
    { title: 'Review team feedback', dueDate: '2024-06-12', priority: 'Medium', priorityClass: 'bg-yellow-100 text-yellow-700' },
    { title: 'Update goals progress', dueDate: '2024-06-15', priority: 'Low', priorityClass: 'bg-green-100 text-green-700' },
  ];

  notifications = [
    { message: 'Your manager left a new comment.', time: 'Just now' },
    { message: 'Performance review period is open.', time: '1 hour ago' },
    { message: 'You have a new goal assigned.', time: 'Yesterday' },
  ];

  openTakeReviewDialog() {
    this.isTakeReviewDialogOpen = true;
  }
  closeTakeReviewDialog() {
    this.isTakeReviewDialogOpen = false;
  }
  toggleNotifications() {
    this.isOpen = !this.isOpen;
  }
}
