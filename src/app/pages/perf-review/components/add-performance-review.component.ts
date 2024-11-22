import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { TableCompetenciesComponent } from './table-competencies.component';
import { TableGoalsComponent } from './table-goals.component';
import { FormEmployeeComponent } from './form-employee.component';
import { ConfirmationComponent } from "./confirmation.component";

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
    ConfirmationComponent
],
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg  w-3/4 p-6">
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
              (competencyChange)="onRowsChange($event)"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 3">
            <app-confirmation/>
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
    </div>
  `,
})
export class AddPerformanceReviewComponent {
  @Output() close = new EventEmitter<void>();
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
    }
  ];
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
    this.competencyData = updatedRows; // Update competency data here
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


  constructor(private http: HttpClient) {}  // Inject HttpClient


  formatDate(date: string): string {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];  // Format to "YYYY-MM-DD"
  }

  submitForm() {
    const startYear = new Date(this.employeeData.startDate).getFullYear() || 0;
    const endYear = new Date(this.employeeData.endDate).getFullYear() || 0;
    const Payload = {
      name: this.employeeData.name || '',
      departmentType: this.employeeData.departmentType || 'None',
      startYear: startYear,
      endYear: endYear,
      startDate: this.formatDate(this.employeeData.startDate),  // Ensure correct date format
      endDate: this.formatDate(this.employeeData.endDate),
      employeeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',  // Replace with actual employeeId if needed
      supervisorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',  // Replace with actual supervisorId if needed
      goals: this.goalsData.map((goal: any) => ({
        orderNo: goal.orderNo,
        goals: goal.goals || '',
        weight: goal.weight,
        date: `${startYear}-${endYear}`,
        measure4: goal.measure4 || '',
        measure3: goal.measure3 || '',
        measure2: goal.measure2 || '',
        measure1: goal.measure1 || ''
      })),
      competencies: this.competencyData.map((competency: any) => ({
        competencyId: competency.competencyId || '',  // Ensure competencyId is set
        orderNo: competency.orderNo,
        weight: competency.weight || 0  // Ensure weight is included
      }))
    };
    console.log('Payload:', Payload); 
    // Make the POST request to the server
    this.http.post<any>('https://localhost:7012/performance-reviews', Payload).subscribe(
      (response) => {
        console.log('Response from API:', response);
        // Handle success (e.g., show a success message or navigate)
      },
      (error) => {
        console.error('Error occurred:', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
  
}
