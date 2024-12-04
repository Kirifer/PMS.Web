import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-h-[75%] flex flex-col">
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
            <span class="text-gray-800">{{ employeeData.employee.fullName }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 font-medium w-1/3">Supervisor:</span>
            <span class="text-gray-800">{{ employeeData.supervisor.fullName }}</span>
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
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Goals</h3>
        <div class="max-h-full">
          <table
            class="min-w-full table-auto border-collapse border border-gray-200 bg-white rounded-lg"
          >
            <thead>
              <tr class="bg-gray-100">
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  No
                </th>
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  Individual Goals
                </th>
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  Weight
                </th>
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let goal of goalsData"
                class="hover:bg-gray-50 transition duration-200"
              >
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ goal.orderNo || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ goal.goals || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ goal.weight || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ goal.date || 'N/A' }}
                </td>
              </tr>
              <tr *ngIf="goalsData.length === 0">
                <td
                  colspan="4"
                  class="border border-gray-200 p-3 text-sm text-center text-gray-700"
                >
                  N/A
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Competency Section -->
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Competencies</h3>
        <div class="max-h-full">
          <table
            class="min-w-full table-auto border-collapse border border-gray-200 bg-white rounded-lg"
          >
            <thead>
              <tr class="bg-gray-100">
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  No
                </th>
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  Competency
                </th>
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  Level
                </th>
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  Weight
                </th>
                <th
                  class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let competency of competencyData"
                class="hover:bg-gray-50 transition duration-200"
              >
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ competency.orderNo || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ getCompetencyName(competency.competencyId) || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ getCompetencyLevel(competency.competencyId) || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{ competency.weight || 'N/A' }}
                </td>
                <td class="border border-gray-200 p-3 text-sm text-gray-700">
                  {{
                    getCompetencyDescription(competency.competencyId) || 'N/A'
                  }}
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
    // console.log('Goals Data:', this.goalsData);
    console.log('Competency Data:', this.competencyData);
    console.log('Competencies:', this.competencies);
    // this.getCompetencyLevel();
  }
  // Methods to retrieve competency details by ID
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
