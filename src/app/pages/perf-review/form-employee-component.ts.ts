import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-5xl mx-auto p-6 bg-white  rounded-lg">
      <!-- <h1 class="text-3xl font-semibold text-gray-700 mb-6">Employee Form</h1> -->
      <form (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Name -->
        <div class="flex flex-col">
          <label for="name" class="text-gray-600 mb-2">Name</label>
          <input 
            id="name" 
            type="text" 
            [(ngModel)]="employeeObj.name" 
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
            [(ngModel)]="employeeObj.departmentType" 
            name="departmentType" 
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option>
             <!-- Department Dropdown -->
            </option>
          </select>
        </div>

        <!-- Start Year -->
        <div class="flex flex-col">
          <label for="startYear" class="text-gray-600 mb-2">Start Year</label>
          <select 
            id="startYear" 
            [(ngModel)]="employeeObj.startYear" 
            name="startYear" 
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option *ngFor="let year of years" [value]="year">{{ year }}</option>
          </select>
        </div>

        <!-- Start Date -->
        <div class="flex flex-col">
          <label for="startDate" class="text-gray-600 mb-2">Start Date</label>
          <input 
            id="startDate" 
            type="date" 
            [(ngModel)]="employeeObj.startDate" 
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
            [(ngModel)]="employeeObj.endYear" 
            name="endYear" 
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option *ngFor="let year of years" [value]="year">{{ year }}</option>
          </select>
        </div>

        <!-- End Date -->
        <div class="flex flex-col">
          <label for="endDate" class="text-gray-600 mb-2">End Date</label>
          <input 
            id="endDate" 
            type="date" 
            [(ngModel)]="employeeObj.endDate" 
            name="endDate" 
            (change)="onEndDateChange($event)"
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Supervisor ID -->
        <div class="flex flex-col">
          <label for="supervisorId" class="text-gray-600 mb-2">Supervisor ID</label>
          <input 
            id="supervisorId" 
            type="text" 
            [(ngModel)]="employeeObj.supervisorId" 
            name="supervisorId" 
            class="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter supervisor's ID"
          />
        </div>

        <!-- Active Supervisor -->
        <div class="flex items-center col-span-2">
          <input 
            id="activeSupervisor" 
            type="checkbox" 
            [(ngModel)]="employeeObj.activeSupervisor" 
            name="activeSupervisor" 
            class="mr-2"
          />
          <label for="activeSupervisor" class="text-gray-600">Active Supervisor</label>
        </div>

      </form>
    </div>
  `,
  styles: [],
})
export class FormEmployeeComponent {
  
  employeeObj = {
    name: '',
    departmentType: '',
    startYear: '',
    endYear: '',
    supervisorId: '',
    startDate: '',
    endDate: '',
    activeSupervisor: false,
  };

  years = [2020, 2021, 2022, 2023, 2024, 2025];


  onStartDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.employeeObj.startDate = input.value;
    }
  }

  onEndDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.employeeObj.endDate = input.value;
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.employeeObj);
  }
}
