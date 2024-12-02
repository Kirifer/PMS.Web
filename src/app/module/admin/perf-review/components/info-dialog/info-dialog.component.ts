import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto p-6"
      >
        <!-- Dialog Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Information</h2>
          <button
            (click)="closeDialog()"
            class="text-blue-900 focus:outline-none"
          >
            ✖
          </button>
        </div>

        <!-- Employee Details Section -->
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">
            Employee Details
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-center">
              <span class="text-gray-600 font-medium w-1/3">Department</span>
              <span class="text-gray-800">{{
                employeeData.departmentType
              }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 font-medium w-1/3"
                >Employee Name:</span
              >
              <span class="text-gray-800">{{ employeeData.employeeName }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 font-medium w-1/3">Supervisor:</span>
              <span class="text-gray-800">{{ employeeData.supervisor }}</span>
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
        <div class="bg-white p-6 rounded-lg mb-16">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">Goals</h3>
          <div class="max-h-48">
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
        <div class="bg-white p-6 rounded-lg mb-72">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">Competencies</h3>
          <div class="max-h-48">
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
                    {{ competency.orderNo }}
                  </td>
                  <td class="border border-gray-200 p-3 text-sm text-gray-700">
                    {{ getCompetencyName(competency.competency.id) || 'N/A' }}
                  </td>
                  <td class="border border-gray-200 p-3 text-sm text-gray-700">
                    {{ getCompetencyLevel(competency.competency.id) || 'N/A' }}
                  </td>
                  <td class="border border-gray-200 p-3 text-sm text-gray-700">
                    {{ competency.weight }}
                  </td>
                  <td class="border border-gray-200 p-3 text-sm text-gray-700">
                    {{
                      getCompetencyDescription(competency.competency.id) ||
                        'N/A'
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InfoDialog implements OnInit {
  @Input() id: string | undefined; // Receives the ID
  @Output() close = new EventEmitter<void>();
  @Input() competencies!: any[];
  employeeData: any = {};
  goalsData: any[] = [];
  competencyData: any[] = [];
  @Output() dataFetched = new EventEmitter<any>();

  http = inject(HttpClient);

  constructor() {}

  ngOnInit() {
    console.log('Received ID:', this.id);
    if (this.id) {
      this.fetchPerformanceReviewDetails();
    }
    console.log(this.competencies);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && this.id) {
      this.fetchPerformanceReviewDetails();
    }
  }

  fetchPerformanceReviewDetails() {
    if (!this.id) return;

    this.http
      .get(`https://localhost:7012/performance-reviews/${this.id}`)
      .subscribe(
        (response: any) => {
          // Check if the response has a 'data' property and handle it accordingly
          if (response && response.succeeded && response.data) {
            const data = response.data;

            // Map the response to the component properties
            this.employeeData = {
              name: data.name,
              employeeName: data.employee.fullName,
              departmentType: data.departmentType,
              supervisor: data.supervisor.fullName,
              startYear: data.startYear,
              endYear: data.endYear,
              startDate: data.startDate,
              endDate: data.endDate,
              // add more fields if necessary
            };

            this.goalsData = data.goals || [];
            this.competencyData = data.competencies || [];

            console.log('test', this.employeeData);
          } else {
            console.error(
              'Failed to fetch performance review details:',
              response
            );
          }
        },
        (error) => {
          console.error('Error fetching performance review details:', error);
        }
      );
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

  closeDialog() {
    this.close.emit();
  }
}
