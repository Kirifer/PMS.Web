import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-h-[75%] flex flex-col gap-6 font-sans text-sm text-gray-800">
      <!-- Employee Details Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Employee Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex">
            <span class="text-gray-600 font-medium w-1/3">Department:</span>
            <span class="text-gray-800">{{ employeeData.departmentType }}</span>
          </div>
          <div class="flex">
            <span class="text-gray-600 font-medium w-1/3">Employee Name:</span>
            <span class="text-gray-800">{{ employeeData.employee.fullName }}</span>
          </div>
          <div class="flex">
            <span class="text-gray-600 font-medium w-1/3">Supervisor:</span>
            <span class="text-gray-800">{{ employeeData.supervisor.fullName }}</span>
          </div>
          <div class="flex">
            <span class="text-gray-600 font-medium w-1/3">Review Year:</span>
            <span class="text-gray-800">
              {{ employeeData.startYear }} - {{ employeeData.endYear }}
            </span>
          </div>
          <div class="flex">
            <span class="text-gray-600 font-medium w-1/3">Start Date:</span>
            <span class="text-gray-800">{{ employeeData.startDate }}</span>
          </div>
          <div class="flex">
            <span class="text-gray-600 font-medium w-1/3">End Date:</span>
            <span class="text-gray-800">{{ employeeData.endDate }}</span>
          </div>
        </div>
      </div>

      <!-- Goals Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Goals</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr class="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th class="border border-gray-200 p-3">No</th>
                <th class="border border-gray-200 p-3">Individual Goals</th>
                <th class="border border-gray-200 p-3">Weight</th>
                <th class="border border-gray-200 p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let goal of goalsData"
                class="hover:bg-gray-50 transition duration-200"
              >
                <td class="border border-gray-200 p-3">{{ goal.orderNo || 'N/A' }}</td>
                <td class="border border-gray-200 p-3">{{ goal.goals || 'N/A' }}</td>
                <td class="border border-gray-200 p-3">{{ goal.weight || 'N/A' }}</td>
                <td class="border border-gray-200 p-3">{{ goal.date || 'N/A' }}</td>
              </tr>
              <tr *ngIf="goalsData.length === 0">
                <td colspan="4" class="border border-gray-200 p-3 text-center">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Competencies Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Competencies</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr class="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th class="border border-gray-200 p-3">No</th>
                <th class="border border-gray-200 p-3">Competency</th>
                <th class="border border-gray-200 p-3">Level</th>
                <th class="border border-gray-200 p-3">Weight</th>
                <th class="border border-gray-200 p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let competency of competencyData"
                class="hover:bg-gray-50 transition duration-200"
              >
                <td class="border border-gray-200 p-3">{{ competency.orderNo || 'N/A' }}</td>
                <td class="border border-gray-200 p-3">
                  {{ getCompetencyName(competency.competencyId) || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3">
                  {{ getCompetencyLevel(competency.competencyId) || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3">{{ competency.weight || 'N/A' }}</td>
                <td class="border border-gray-200 p-3">
                  {{ getCompetencyDescription(competency.competencyId) || 'N/A' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class DialogConfirmationComponent implements OnInit {
  @Input() employeeData!: any;
  @Input() goalsData!: any[];
  @Input() competencyData!: any[];
  @Input() competencies!: any[];

  ngOnInit(): void {
    console.log('Employee Data:', this.employeeData);
    console.log('Competency Data:', this.competencyData);
    console.log('Competencies:', this.competencies);
  }

  getCompetencyName(competencyId: string): string | undefined {
    return this.competencies.find((c) => c.id === competencyId)?.competency;
  }

  getCompetencyLevel(competencyId: string): string | undefined {
    return this.competencies.find((c) => c.id === competencyId)?.level;
  }

  getCompetencyDescription(competencyId: string): string | undefined {
    return this.competencies.find((c) => c.id === competencyId)?.description;
  }
}
