import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { StatCardComponent } from './stat-card.component';
import { PerformanceTableComponent } from './performance-table.component';

interface PerformanceRecord {
  id: number;
  department: string;
  reviewYear: number;
  startDate: string;
  endDate: string;
  name: string;
  supervisor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, StatCardComponent, PerformanceTableComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 rounded-tl-2xl rounded-bl-2xl">
      <div class="max-w-full mx-auto px-4">
        <h1 class="text-3xl font-semibold text-gray-900 mb-6">
          Performance Management Dashboard
        </h1>
        <p class="text-sm text-gray-600 mt-[-20px] mb-4">
          Track, Analyze, and Optimize Performance Dashboard
        </p>

        <!-- Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <app-stat-card
            *ngFor="let stat of stats"
            [title]="stat.title"
            [count]="stat.count"
            [bgColor]="stat.bgColor"
            [icon]="stat.icon"
          />
        </div>

        <!-- Performance Table -->
        <app-performance-table />
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent {
  stats = [
    {
      title: 'Total Users',
      count: 150,
      bgColor: 'bg-blue-500',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      title: 'Self Assessment',
      count: 85,
      bgColor: 'bg-green-500',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Manager Assessment',
      count: 65,
      bgColor: 'bg-yellow-500',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
      title: 'Completed',
      count: 45,
      bgColor: 'bg-purple-500',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    },
  ];
}
