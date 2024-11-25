import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';

// interface ICompetency {
//   id: string;
//   competency: string;
//   level: string;
//   description: string;
//   weight: number;
// }

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="max-h-screen flex flex-col space-y-8 p-6">
  <!-- Employee Details Section -->
  <div class="bg-white p-6 rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Employee Details</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Department -->
      <div class="flex items-center">
        <span class="text-gray-600 font-medium w-1/3">Department</span>
        <span class="text-gray-800">HR Department</span>
      </div>
      <!-- Employee Name -->
      <div class="flex items-center">
        <span class="text-gray-600 font-medium w-1/3">Employee Name:</span>
        <span class="text-gray-800">John Smith</span>
      </div>
      <!-- Supervisor -->
      <div class="flex items-center">
        <span class="text-gray-600 font-medium w-1/3">Supervisor:</span>
        <span class="text-gray-800">Jane Doe</span>
      </div>
      <!-- Review Year -->
      <div class="flex items-center">
        <span class="text-gray-600 font-medium w-1/3">Review Year:</span>
        <span class="text-gray-800">2024 - 2025</span>
      </div>
      <!-- Start Date -->
      <div class="flex items-center">
        <span class="text-gray-600 font-medium w-1/3">Start Date:</span>
        <span class="text-gray-800">01/01/2024</span>
      </div>
      <!-- End Date -->
      <div class="flex items-center">
        <span class="text-gray-600 font-medium w-1/3">End Date:</span>
        <span class="text-gray-800">12/31/2024</span>
      </div>
    </div>
  </div>

  <!-- Goals Section -->
<div class="bg-white p-6  rounded-lg">
  <h3 class="text-2xl font-bold mb-6 text-gray-800">Goals</h3>
  <div class="overflow-y-auto max-h-96">
    <table class="min-w-full table-auto border-collapse border border-gray-200 bg-white  rounded-lg">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">No</th>
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Individual Goals</th>
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Weight</th>
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Date</th>
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Did Not Meet Expectations</th>
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Met Expectations</th>
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Met and Sometimes Exceeds Expectations</th>
          <th class="border border-gray-200 p-3 text-left text-sm font-medium text-gray-600">Consistently Exceeds Expectations</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-gray-50 transition duration-200">
          <td class="border border-gray-200 p-3 text-sm text-gray-700">1</td>
          <td class="border border-gray-200 p-3 text-sm text-gray-700">Goal 1</td>
          <td class="border border-gray-200 p-3 text-sm text-gray-700">0</td>
          <td class="border border-gray-200 p-3 text-sm text-gray-700">-</td>
          <td class="border border-gray-200 p-3 text-sm text-gray-700">0</td>
          <td class="border border-gray-200 p-3 text-sm text-gray-700">0</td>
          <td class="border border-gray-200 p-3 text-sm text-gray-700">0</td>
          <td class="border border-gray-200 p-3 text-sm text-gray-700">0</td>
        </tr>
        <!-- Repeat for other goals -->
      </tbody>
    </table>
  </div>
</div>

  <!-- Competency Section -->
  <div class="bg-white p-6 rounded-lg">
    <h3 class="text-2xl font-bold mb-6 text-gray-800">Competency</h3>
    <table class="w-full border-collapse border border-gray-200 bg-white rounded-lg">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-200 p-4 text-left">No</th>
          <th class="border border-gray-200 p-4 text-left">Competency</th>
          <th class="border border-gray-200 p-4 text-left">Weight</th>
          <th class="border border-gray-200 p-4 text-left">Level</th>
          <th class="border border-gray-200 p-4 text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-gray-50 transition duration-200">
          <td class="border border-gray-200 p-4">1</td>
          <td class="border border-gray-200 p-4">Competency 1</td>
          <td class="border border-gray-200 p-4">0</td>
          <td class="border border-gray-200 p-4">0</td>
          <td class="border border-gray-200 p-4">-</td>
        </tr>
        <!-- Repeat for other competencies -->
      </tbody>
    </table>
  </div>
</div>
  `,
  styleUrls: [],
})
export class ConfirmationComponent {



  // getData() {
  //   return {
  //     name: this.name,
  //     departmentType: this.departmentType,
  //     startYear: this.startYear,
  //     endYear: this.endYear,
  //     supervisorId: this.supervisorId,
  //     startDate: this.startDate,
  //     endDate: this.endDate,
  //     activeSupervisor: this.activeSupervisor,
  //   };
  // }
}
