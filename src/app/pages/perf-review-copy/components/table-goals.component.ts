import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddPerformanceReviewComponent } from './add-performance-review.component';

@Component({
  selector: 'app-table-goals',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <!-- Table responsive wrapper -->
    <div class="mt-5 overflow-x-auto bg-white rounded-lg shadow-sm">
      <!-- Table -->
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table head -->
        <thead class="bg-gray-50">
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Measures</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Individual Goals</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">4-Consistently Exceeds Expectations</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">3-Met and Sometimes Exceeds Expectations</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2-Met Expectations</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1-Did Not Meet Expectations</th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of rows; let i = index">
            <th scope="row" class="px-6 py-4 whitespace-nowrap font-light text-sm text-gray-900">{{i + 1}}</th>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea class="w-full p-1 border rounded text-center text-sm resize-none" rows="2"></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <input type="number" class="w-full p-1 border rounded text-center text-sm" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea class="w-full p-1 border rounded text-center text-sm resize-none" rows="2"></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea class="w-full p-1 border rounded text-center text-sm resize-none" rows="2"></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea class="w-full p-1 border rounded text-center text-sm resize-none" rows="2"></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea class="w-full p-1 border rounded text-center text-sm resize-none" rows="2"></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class TableGoalsComponent {
  rows = new Array(5); 


  
}
