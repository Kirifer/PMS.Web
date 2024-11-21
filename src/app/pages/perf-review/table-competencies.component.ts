import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddPerformanceReviewComponent } from './add-performance-review.component';

@Component({
  selector: 'app-table-competencies',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="mt-5 overflow-x-auto bg-white rounded-lg shadow-sm">
      <!-- Table -->
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table head -->
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No.
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Competencies
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Weight
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Level
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of rows; let i = index">
            <th
              scope="row"
              class="px-6 py-4 whitespace-nowrap font-light text-sm text-gray-900"
            >
              {{ i + 1 }}
            </th>
            <!-- Competencies as a Select Input -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <select
                [(ngModel)]="row.competency"
                class="w-full p-1 border rounded text-center text-sm"
              >
                <option *ngFor="let option of competencies" [value]="option">
                  {{ option }}
                </option>
              </select>
            </td>
            <!-- Weight as an Input -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <input
                type="number"
                class="w-full p-1 border rounded text-center text-sm"
              />
            </td>
            <!-- Level as a Select Input -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <select
                [(ngModel)]="row.level"
                class="w-full p-1 border rounded text-center text-sm"
              >
                <option *ngFor="let option of levels" [value]="option">
                  {{ option }}
                </option>
              </select>
            </td>
            <!-- Description as a Textarea -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea
                class="w-full p-1 border rounded text-center text-sm resize-none"
                rows="2"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class TableCompetenciesComponent {
  rows = new Array(5).fill({}).map(() => ({ competency: '', level: '' }));

  // Options for the dropdowns
  competencies = ['Communication', 'Teamwork', 'Problem Solving', 'Leadership'];
  levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
}
