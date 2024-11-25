import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-h-screen flex flex-col space-y-8 p-6">
      <!-- Employee Details Section -->
      <div class="bg-white p-6 rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Employee Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-center">
            <span class="text-gray-600 font-medium w-1/3">Department</span>
            <span class="text-gray-800">{{ employeeData.departmentType }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-medium w-1/3">Employee Name:</span>
            <span class="text-gray-800">{{ employeeData.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-medium w-1/3">Supervisor:</span>
            <span class="text-gray-800">{{ employeeData.supervisorId }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-medium w-1/3">Review Year:</span>
            <span class="text-gray-800">
              {{ employeeData.startYear }} - {{ employeeData.endYear }}
            </span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-medium w-1/3">Start Date:</span>
            <span class="text-gray-800">{{ employeeData.startDate }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-medium w-1/3">End Date:</span>
            <span class="text-gray-800">{{ employeeData.endDate }}</span>
          </div>
        </div>
      </div>

      <!-- Goals Section -->
      <div class="bg-white p-6  rounded-lg">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Goals</h3>
        <div class="overflow-y-auto max-h-96">
          <table class="min-w-full table-auto border-collapse border border-gray-200 bg-white rounded-lg">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">No</th>
                <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Individual Goals</th>
                <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Weight</th>
                <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let goal of goalsData" class="hover:bg-gray-50 transition duration-200">
                <td class="border border-gray-200 p-3 text-sm text-gray-700">{{ goal.orderNo }}</td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">{{ goal.goals }}</td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">{{ goal.weight }}</td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">{{ goal.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Competency Section -->
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Competencies</h3>
        <table class="w-full border-collapse border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-200 p-4 text-left">No</th>
              <th class="border border-gray-200 p-4 text-left">Competency ID</th>
              <th class="border border-gray-200 p-4 text-left">Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let competency of competencyData" class="hover:bg-gray-50 transition duration-200">
              <td class="border border-gray-200 p-4">{{ competency.orderNo }}</td>
              <td class="border border-gray-200 p-4">{{ competency.competencyId }}</td>
              <td class="border border-gray-200 p-4">{{ competency.weight }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ConfirmationComponent {
  @Input() employeeData!: any;
  @Input() goalsData!: any[];
  @Input() competencyData!: any[];
}
