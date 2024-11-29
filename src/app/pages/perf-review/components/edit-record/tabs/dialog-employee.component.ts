import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-dialog-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <div class="flex flex-col">
          <label for="name" class="text-gray-600 mb-2">Full Name</label>
          <select
            id="name"
            [(ngModel)]="employeeData.name"
            name="name"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>Select a User</option>
            <option *ngFor="let user of lookUpUsers" [value]="user.fullName">
              {{ user.fullName }}
            </option>
          </select>
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
            <option *ngFor="let department of departmentTypes" [value]="department">
              {{ department }}
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

        <!-- Supervisor ID -->
        <div class="flex flex-col">
          <label for="supervisorId" class="text-gray-600 mb-2">Supervisor ID</label>
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
          <label for="activeSupervisor" class="text-gray-600">Active Supervisor</label>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EditFormEmployeeComponent  {
  @Input() employeeData: any = {
    name: '',
    departmentType: '',
    startYear: '',
    endYear: '',
    startDate: '',
    endDate: '',
    supervisorId: '',
  };
  @Input() lookUpUsers: any[] = [];
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() employeeDataChange = new EventEmitter<any>();

  years: number[] = [];
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

  constructor() {
    this.generateYearsRange();
  }

  onStartDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      const selectedDate = new Date(input.value);
      this.employeeData.startYear = selectedDate.getFullYear().toString();
      this.startDateChange.emit(input.value);
    }
  }

  onEndDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      const selectedDate = new Date(input.value);
      this.employeeData.endYear = selectedDate.getFullYear().toString();
      this.endDateChange.emit(input.value);
    }
  }

  generateYearsRange() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    this.years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }

  isFormValid(): boolean {
    const { name, departmentType, startYear, endYear, startDate, endDate, supervisorId } = this.employeeData;
    return name && departmentType && startYear && endYear && startDate && endDate && supervisorId;
  }

  emitemployeeDataChange() {
    this.employeeDataChange.emit(this.employeeData);
  }
}
