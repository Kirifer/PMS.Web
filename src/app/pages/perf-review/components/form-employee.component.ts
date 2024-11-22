import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-employee',
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
            [(ngModel)]="name"
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
            [(ngModel)]="departmentType"
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
            [(ngModel)]="startYear"
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
            [(ngModel)]="startDate"
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
            [(ngModel)]="endYear"
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
            [(ngModel)]="endDate"
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
            [(ngModel)]="supervisorId"
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
            [(ngModel)]="activeSupervisor"
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
export class FormEmployeeComponent {
  name: string = '';
  departmentType: string = '';
  startYear: string = '';
  endYear: string = '';
  supervisorId: string = '';
  startDate: string = '';
  endDate: string = '';
  activeSupervisor: boolean = false;

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

  onStartDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.startDate = input.value;
    }
  }

  onEndDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.endDate = input.value;
    }
  }
  getData() {
    return {
      name: this.name,
      departmentType: this.departmentType,
      startYear: this.startYear,
      endYear: this.endYear,
      supervisorId: this.supervisorId,
      startDate: this.startDate,
      endDate: this.endDate,
      activeSupervisor: this.activeSupervisor,
    };
  }
}
