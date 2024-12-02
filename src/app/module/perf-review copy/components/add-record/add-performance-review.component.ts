import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { TableCompetenciesComponent } from './table-competencies.component';
import { TableGoalsComponent } from './table-goals.component';
import { FormEmployeeComponent } from './form-employee.component';
import { ConfirmationComponent } from './confirmation.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-add-performance-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
    CommonModule,
    TableCompetenciesComponent,
    TableGoalsComponent,
    FormEmployeeComponent,
    ConfirmationComponent,
    ToastComponent,
  ],
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-h-[80vh] w-3/4 p-6">
        <!-- Dialog Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Add a Record</h2>
          <button
            (click)="closeDialog()"
            class="text-blue-900 focus:outline-none"
          >
            ✖
          </button>
        </div>

        <!-- Tabs -->
        <div class="mt-4 border-b">
          <ul class="flex justify-between space-x-4">
            <li
              *ngFor="let tab of tabs; let i = index"
              (click)="activeTab = i"
              [class.border-blue-500]="activeTab === i"
              [class.text-blue-500]="activeTab === i"
              class="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-blue-500 hover:border-blue-300"
            >
              {{ tab.label }}
            </li>
          </ul>
        </div>

        <!-- Tab Content -->
        <div class="mt-4 max-h-96 overflow-y-auto">
          <ng-container *ngIf="activeTab === 0">
            <app-form-employee
              [employeeData]="employeeData"
              (startDateChange)="onStartDateChange($event)"
              (endDateChange)="onEndDateChange($event)"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 1">
            <app-table-goals
              [goalsData]="goalsData"
              [startDate]="employee.startDate"
              [endDate]="employee.endDate"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 2">
            <app-table-competencies
              [competencyData]="competencyData"
              [competencies]="competencies"
              [competencyOptions]="competencyOptions"
              (competencyChange)="onRowsChange($event)"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 3">
            <app-confirmation
              [employeeData]="employeeData"
              [goalsData]="goalsData"
              [competencyData]="competencyData"
              [competencies]="competencies"
            />
          </ng-container>
        </div>

        <!-- Dialog Footer -->
        <div class="mt-6 flex justify-end space-x-4">
          <button
            (click)="closeDialog()"
            class="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            (click)="submitForm()"
            class="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
      <app-toast></app-toast>
    </div>
  `,
})
export class AddPerformanceReviewComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent; // Add ViewChild to access the Toast component

  // Other existing code

  // Show toast function as discussed above

  employee = {
    startDate: '',
    endDate: '',
  };
  employeeData = {
    name: '',
    departmentType: '',
    startYear: '',
    endYear: '',
    supervisorId: '',
    startDate: '',
    endDate: '',
    activeSupervisor: false,
  };
  competencyData = [
    {
      competencyId: '',
      orderNo: 1,
      weight: 0,
    },
    {
      competencyId: '',
      orderNo: 2,
      weight: 0,
    },
    {
      competencyId: '',
      orderNo: 3,
      weight: 0,
    },
    {
      competencyId: '',
      orderNo: 4,
      weight: 0,
    },
  ];
  competencies: { competency: string }[] = [];
  competencyOptions: any[] = [];
  goalsData = [
    {
      orderNo: 1,
      goals: '',
      weight: 0,
      date: '',
      measure4: '',
      measure3: '',
      measure2: '',
      measure1: '',
    },
    {
      orderNo: 2,
      goals: '',
      weight: 0,
      date: '',
      measure4: '',
      measure3: '',
      measure2: '',
      measure1: '',
    },
    {
      orderNo: 3,
      goals: '',
      weight: 0,
      date: '',
      measure4: '',
      measure3: '',
      measure2: '',
      measure1: '',
    },
    {
      orderNo: 4,
      goals: '',
      weight: 0,
      date: '',
      measure4: '',
      measure3: '',
      measure2: '',
      measure1: '',
    },
    {
      orderNo: 5,
      goals: '',
      weight: 0,
      date: '',
      measure4: '',
      measure3: '',
      measure2: '',
      measure1: '',
    },
  ];
  activeTab = 0;
  tabs = [
    { label: 'Employee Details' },
    { label: 'Goals' },
    { label: 'Competencies' },
    { label: 'Confirmation' },
  ];

  onRowsChange(updatedRows: any[]) {
    this.competencyData = updatedRows;
  }

  onStartDateChange(date: string) {
    this.employee.startDate = date;
    this.updateGoalsDateRange();
  }

  onEndDateChange(date: string) {
    this.employee.endDate = date;
    this.updateGoalsDateRange();
  }

  updateGoalsDateRange() {
    const dateRange = `${this.employee.startDate} - ${this.employee.endDate}`;
    this.goalsData.forEach((goal) => {
      goal.date = dateRange;
    });
  }

  closeDialog() {
    this.close.emit();
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Call fetchCompetencies when the component is initialized
    this.fetchCompetencies();
    console.log('test')
  }

  formatDate(date: string): string {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  }

  fetchCompetencies(): void {
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (data) => {
        if (data?.data) {
          this.competencies = data.data;
          this.competencyOptions = [
            ...new Set(this.competencies.map((item) => item.competency)),
          ];
          // console.log('Fetched competencies:', this.competencies); // Log the fetched data
          // console.log('Competency options:', this.competencyOptions); // Log the unique competency options
        }
      },
      (error) => console.error('Error fetching competencies:', error)
    );
  }

  @Output() updateTable = new EventEmitter<any>();

  submitForm() {
    const startYear = new Date(this.employeeData.startDate).getFullYear() || 0;
    const endYear = new Date(this.employeeData.endDate).getFullYear() || 0;

    // Check for empty fields in employeeData
    if (
      !this.employeeData.name ||
      !this.employeeData.departmentType ||
      !this.employeeData.startDate ||
      !this.employeeData.endDate
    ) {
      this.showToast('Please fill in all required employee fields!');
      return; // Prevent further processing if validation fails
    }

    // Check for empty fields in goalsData
    for (const goal of this.goalsData) {
      if (!goal.goals || goal.weight === 0 || !goal.date) {
        this.showToast('Please fill in all required goal fields!');
        return;
      }
    }

    // Check if total weight in goalsData equals 100%
    const totalGoalWeight = this.goalsData.reduce(
      (sum, goal) => sum + goal.weight,
      0
    );
    if (totalGoalWeight !== 100) {
      this.showToast('The total weight for goals must equal 100%.');
      return;
    }

    // Check for empty fields in competencyData
    for (const competency of this.competencyData) {
      if (!competency.competencyId || competency.weight === 0) {
        this.showToast('Please fill in all required competency fields!');
        return;
      }
    }

    // Check if total weight in competencyData equals 100%
    const totalCompetencyWeight = this.competencyData.reduce(
      (sum, competency) => sum + competency.weight,
      0
    );
    if (totalCompetencyWeight !== 100) {
      this.showToast('The total weight for competencies must equal 100%.');
      return;
    }

    // Prepare Payload if all fields are valid
    const Payload = {
      name: this.employeeData.name || '',
      departmentType: this.employeeData.departmentType || 'None',
      startYear: startYear,
      endYear: endYear,
      startDate: this.formatDate(this.employeeData.startDate),
      endDate: this.formatDate(this.employeeData.endDate),
      employeeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      supervisorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      goals: this.goalsData.map((goal: any) => ({
        orderNo: goal.orderNo,
        goals: goal.goals || '',
        weight: goal.weight,
        date: `${startYear}-${endYear}`,
        measure4: goal.measure4 || '',
        measure3: goal.measure3 || '',
        measure2: goal.measure2 || '',
        measure1: goal.measure1 || '',
      })),
      competencies: this.competencyData.map((competency: any) => ({
        competencyId: competency.competencyId || '',
        orderNo: competency.orderNo,
        weight: competency.weight || 0,
      })),
    };

    console.log('Payload:', Payload);

    // Perform API request
    this.http
      .post<any>('https://localhost:7012/performance-reviews', Payload)
      .subscribe(
        (response) => {
          console.log('Response from API:', response);
          this.showToast('Record added successfully!'); // Show success toast
          this.closeDialog(); // Close dialog on success
        },
        (error) => {
          console.error('Error occurred:', error);
          this.showToast('Error adding record. Please try again.'); // Show error toast
        }
      );

    this.updateTable.emit({ success: true, newData: this.employeeData });
  }

  showToast(message: string) {
    const toast = this.toastComponent; // Reference to the ToastComponent
    toast.show(message); // Show the toast with the message
  }
}
