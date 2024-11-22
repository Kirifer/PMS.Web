import { Component } from '@angular/core';
import { PerformanceReviewTableComponent } from './components/performance-review-table.component';

@Component({
  selector: 'app-perf-review',
  standalone: true,
  imports: [PerformanceReviewTableComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-full mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold text-gray-900">
            Performance Review 2
          </h1>
        </div>

        <p class="text-sm text-gray-600 mt-[-20px] mb-4">
          Comprehensive Employee Performance Review
        </p>
        <app-performance-review-table />
      </div>
    </div>
  `,
  styles: ``,
})
export class PerfReviewComponent2 {}
