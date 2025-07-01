import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-h-[75%] flex flex-col">
      <!-- Employee Details Section -->
      <div class="bg-white p-6 rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 uppercase">Employee Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-center">
            <span class="text-gray-600 font-bold w-1/3">Employee Name:</span>
            <span class="text-gray-800"
              >{{ reviewDetails.employeeId }} -
              {{ reviewDetails.employeeName }}</span
            >
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-bold w-1/3">Start Date:</span>
            <span class="text-gray-800">{{ reviewDetails.startDate }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-bold w-1/3">Review Year:</span>
            <span class="text-gray-800">
              {{ reviewDetails.reviewYear }}
            </span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-bold w-1/3">End Date:</span>
            <span class="text-gray-800">{{ reviewDetails.endDate }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-bold w-1/3">Supervisor:</span>
            <span class="text-gray-800">{{ reviewDetails.supervisor }}</span>
          </div>
        </div>
      </div>

      <!-- Goals Section -->
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-2xl font-bold mb-6 text-gray-800 uppercase">Goals</h3>
        <div class="max-h-full">
          <table class="min-w-full divide-y divide-gray-200">
            <!-- Table head -->
            <thead class="bg-blue-300">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-2 text-center text-xs font-bold text-white uppercase tracking-wider"
                >
                  No.
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  Individual Goals
                </th>
                <th
                  scope="col"
                  class="px-1/3 py-2 text-center text-xs font-bold text-white uppercase tracking-wider"
                >
                  <span>Weight</span> (%)
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-center text-xs font-bold text-white uppercase tracking-wider w-44"
                >
                  Employee Level
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  Employee Comments
                </th>
                <th
                  scope="col"
                  class="px-1/3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-44"
                >
                  Manager Level
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  Manager Comments
                </th>
              </tr>
            </thead>

            <!-- Table body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let row of reviewDetails.goals; let i = index">
                <th
                  scope="row"
                  class="px-4 py-2 text-sm font-light text-gray-900"
                >
                  {{ i + 1 }}
                </th>
                <td class="px-4 py-2 text-sm text-gray-900 w-48">
                  {{ row.label }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900 w-20">
                  {{ row.weight }} %
                </td>
                <td class="px-4 py-2 text-sm text-gray-900 w-24">
                  {{ row.employeeLevel }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900">
                  {{ row.employeeComments || "N/A"}}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900 w-24">
                  {{ row.managerLevel }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900">
                  {{ row.managerComments || "N/A"}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Competency Section -->
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-2xl font-bold mb-6 text-gray-800 uppercase">Competencies</h3>
        <div class="max-h-full">
          <table class="min-w-full divide-y divide-gray-200">
            <!-- Table head -->
            <thead class="bg-blue-300">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-2 text-center text-xs font-bold text-white uppercase tracking-wider"
                >
                  No.
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  Competency
                </th>
                <th
                  scope="col"
                  class="px-1/3 py-2 text-center text-xs font-bold text-white uppercase tracking-wider"
                >
                  <span>Weight</span> (%)
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-center text-xs font-bold text-white uppercase tracking-wider w-44"
                >
                  Employee Level
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  Employee Comments
                </th>
                <th
                  scope="col"
                  class="px-1/3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-44"
                >
                  Manager Level
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  Manager Comments
                </th>
              </tr>
            </thead>

            <!-- Table body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let row of reviewDetails.competencies; let i = index">
                <th
                  scope="row"
                  class="px-4 py-2 text-sm font-light text-gray-900"
                >
                  {{ i + 1 }}
                </th>
                <td class="px-4 py-2 text-sm text-gray-900 w-48">
                  {{ row.label }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900 w-20">
                  {{ row.weight }} %
                </td>
                <td class="px-4 py-2 text-sm text-gray-900 w-24">
                  {{ row.employeeLevel }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900">
                  {{ row.employeeComments || "N/A"}}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900 w-24">
                  {{ row.managerLevel }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900">
                  {{ row.managerComments || "N/A"}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DialogConfirmationComponent {
  @Input() reviewDetails: any = {};
}
