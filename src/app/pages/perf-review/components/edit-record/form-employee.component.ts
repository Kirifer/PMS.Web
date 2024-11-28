import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-form-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-5xl mx-auto p-6 bg-white  rounded-lg">
      <!-- <h1 class="text-3xl font-semibold text-gray-700 mb-6">Employee Form</h1> -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name -->
        <div class="flex flex-col">
          <label for="name" class="text-gray-600 mb-2">Name</label>
          <input
            id="name"
            type="text"
            [(ngModel)]="employeeData.name"
            name="name"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee's name"
          />
        </div>

        <!-- Department -->
        <div class="flex flex-col">
          <label for="department" class="text-gray-600 mb-2">Department</label>
          <select
            id="department"
            [(ngModel)]="employeeData.departmentType"
            name="departmentType"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>Select Department</option>
            <option
              *ngFor="let department of departmentTypes"
              [value]="department"
            >
              {{ department }}
            </option>
          </select>
        </div>

        <!-- Start Year -->
        <div class="flex flex-col">
          <label for="startYear" class="text-gray-600 mb-2">Start Year</label>
          <select
            id="startYear"
            [(ngModel)]="employeeData.startYear"
            name="startYear"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>Select Start Year</option>
            <option *ngFor="let year of years" [value]="year">
              {{ year }}
            </option>
          </select>
        </div>

        <!-- Start Date -->
        <div class="flex flex-col">
          <label for="startDate" class="text-gray-600 mb-2">Start Date</label>
          <input
            id="startDate"
            type="date"
            [(ngModel)]="employeeData.startDate"
            name="startDate"
            (change)="onStartDateChange($event)"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- End Year -->
        <div class="flex flex-col">
          <label for="endYear" class="text-gray-600 mb-2">End Year</label>
          <select
            id="endYear"
            [(ngModel)]="employeeData.endYear"
            name="endYear"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>Select End Year</option>
            <option *ngFor="let year of years" [value]="year">
              {{ year }}
            </option>
          </select>
        </div>

        <!-- End Date -->
        <div class="flex flex-col">
          <label for="endDate" class="text-gray-600 mb-2">End Date</label>
          <input
            id="endDate"
            type="date"
            [(ngModel)]="employeeData.endDate"
            name="endDate"
            (change)="onEndDateChange($event)"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Supervisor ID -->
        <div class="flex flex-col">
          <label for="supervisorId" class="text-gray-600 mb-2"
            >Supervisor ID</label
          >
          <input
            id="supervisorId"
            type="text"
            [(ngModel)]="employeeData.supervisorId"
            name="supervisorId"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter supervisor's ID"
          />
        </div>

        <!-- Active Supervisor -->
        <div class="flex items-center col-span-2 mt-[-15px]">
          <input
            id="activeSupervisor"
            type="checkbox"
            [(ngModel)]="employeeData.activeSupervisor"
            name="activeSupervisor"
            class="mr-2"
          />
          <label for="activeSupervisor" class="text-gray-600"
            >Active Supervisor</label
          >
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EditFormEmployeeComponent {
  @Input() employeeData: any = {
    name: '',
    departmentType: '',
    startYear: 0,
    endYear: 0,
    startDate: '',
    endDate: '',
    supervisorId: '',
  };
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() proceedToGoals = new EventEmitter<void>();
  @Output() employeeDataChange = new EventEmitter<any[]>();

  emitemployeeDataChange() {
    this.employeeDataChange.emit(this.employeeData);
  }
  constructor(private router: Router) {}

  onStartDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.startDateChange.emit(input.value);
    }
  }

  onEndDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.endDateChange.emit(input.value);
    }
  }

  years = [2020, 2021, 2022, 2023, 2024, 2025];

  departmentTypes = [
    'None',
    'Development',
    'HumanResources',
    'Engagement',
    'Finance',
    'Sales',
    'Creative',
    'Marketing',
    'Management',
    'TechnicalSupport',
  ];

  isFormValid(): boolean {
    const {
      name,
      departmentType,
      startYear,
      endYear,
      startDate,
      endDate,
      supervisorId,
    } = this.employeeData;
    return (
      name &&
      departmentType &&
      startYear &&
      endYear &&
      startDate &&
      endDate &&
      supervisorId
    );
  }
}
