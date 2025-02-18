import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full bg-white rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table head -->
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No.
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48"
            >
              Individual Goals
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20"
            >
              Weight (%)
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
            >
              Employee Level
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Employee Comments
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
            >
              Manager Level
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Manager Comments
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of reviewDetails.goals; let i = index">
            <th scope="row" class="px-4 py-2 text-sm font-light text-gray-900">
              {{ i + 1 }}
            </th>
            <td class="px-4 py-2 text-sm text-gray-900 w-48">
              {{ row.label }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-900 w-20">
              {{ row.weight }} %
            </td>
            <td class="px-4 py-2 text-sm text-gray-900 w-24">
              <select
                class="w-full p-2 border rounded text-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                [(ngModel)]="row.employeeLevel"
              >
                <option value="" disabled selected>Select Level</option>
                <option *ngFor="let level of employeeLevels" [value]="level">
                  {{ level }}
                </option>
              </select>
            </td>
            <td class="px-4 py-2 text-sm text-gray-900">
              <textarea
                class="w-full p-2 border rounded text-sm resize-none focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                rows="4"
                [(ngModel)]="row.employeeComments"
              ></textarea>
            </td>
            <td class="px-4 py-2 text-sm text-gray-900 w-24">
              <select
                class="w-full p-2 border rounded text-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                [(ngModel)]="row.managerLevel"
              >
                <option *ngFor="let level of managerLevels" [value]="level">
                  {{ level }}
                </option>
              </select>
            </td>
            <td class="px-4 py-2 text-sm text-gray-900">
              <textarea
                class="w-full p-2 border rounded text-sm resize-none focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                rows="4"
                [(ngModel)]="row.managerComments"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class DialogGoalsComponent implements OnInit {
  @Input() reviewDetails: any = {};

  employeeLevels = [
    'Consistently Exceeds Expectations',
    'Met and Sometimes Exceeds Expectations',
    'Met Expectations',
    'Did Not Meet Expectations',
  ];

  managerLevels = [
    'Consistently Exceeds Expectations',
    'Met and Sometimes Exceeds Expectations',
    'Met Expectations',
    'Did Not Meet Expectations',
  ];

  ngOnInit(): void {
    console.log('reviewDetails', this.reviewDetails);
  }
}
