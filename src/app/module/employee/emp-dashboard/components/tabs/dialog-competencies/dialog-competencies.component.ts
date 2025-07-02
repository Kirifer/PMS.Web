import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-competencies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full bg-white rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table head -->
        <thead class="bg-blue-300">
          <tr>
            <th
              scope="col"
              class="px-2 py-2 text-center text-sm font-bold text-white uppercase tracking-wider"
            >
              No.
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider"
            >
              Competency
            </th>
            <th
              scope="col"
              class="px-2 py-2 text-center text-xs font-bold text-white uppercase tracking-wider"
            >
              <span class="text-sm">Weight</span> (%)
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider w-44"
            >
              Employee Level
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-center text-sm font-bold text-white uppercase tracking-wider"
            >
              Employee Comments
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider w-44"
            >
              Manager Level
            </th>
            <th
              scope="col"
              class="px-4 py-2 text-center text-sm font-bold text-white uppercase tracking-wider"
            >
              Manager Comments
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of reviewDetails.competencies; let i = index" class="odd:bg-white even:bg-blue-50">
            <th scope="row" class="px-4 py-2 text-sm font-light text-gray-900">
              {{ i + 1 }}
            </th>
            <td class="px-4 py-2 text-sm text-gray-900 w-48">
              {{ row.label }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-900 w-20">
              {{ row.weight }} %
            </td>
            <!-- Employee Level Dropdown -->
            <td class="px-4 py-2 text-sm text-gray-900 w-25">
              <select
                class="w-full p-2 border rounded text-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                [(ngModel)]="row.employeeLevel"
              >
                <option value="" disabled>Select Level</option>
                <option *ngFor="let level of employeeLevels" [value]="level">
                  {{ level }}
                </option>
              </select>
            </td>
            <td class="px-4 py-2 text-sm text-gray-900">
              <textarea
                class="w-full p-2 border rounded text-sm resize-none focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                rows="2"
                [(ngModel)]="row.employeeComments"
              ></textarea>
            </td>
            <!-- Manager Level Dropdown -->
            <td class="px-4 py-2 text-sm text-gray-900 w-24">
              <select
                class="w-full p-2 border rounded text-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                [(ngModel)]="row.managerLevel"
              >
                <option value="" disabled>Select Level</option>
                <option *ngFor="let level of managerLevels" [value]="level">
                  {{ level }}
                </option>
              </select>
            </td>
            <td class="px-4 py-2 text-sm text-gray-900">
              <textarea
                class="w-full p-2 border rounded text-sm resize-none focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                rows="2"
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
export class DialogCompetenciesComponent implements OnInit {
  @Input() reviewDetails: any = {};

  employeeLevels = [
    'Resource for Others',
    'Significant Strength',
    'Growing Strength',
    'Development Needed',
  ];

  managerLevels = [
    'Resource for Others',
    'Significant Strength',
    'Growing Strength',
    'Development Needed',
  ];

  ngOnInit(): void {
    console.log('reviewDetails', this.reviewDetails);
  }
}
