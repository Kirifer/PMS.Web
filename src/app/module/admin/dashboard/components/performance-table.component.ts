import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular'; // Import Lucide icons

interface PerformanceRecord {
  id: number;
  department: string;
  reviewYear: number;
  startDate: string;
  endDate: string;
  name: string;
  supervisor: string;
}

@Component({
  selector: 'app-performance-table',
  standalone: true,
  imports: [NgFor, NgIf, LucideAngularModule], // Add LucideAngularModule
  template: `
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th *ngFor="let header of headers" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Empty State -->
           <tr *ngIf="records.length === 0">
          <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500 italic">
            No performance records available.
          </td>
        </tr>
        <!-- Data rows -->
          <tr *ngFor="let record of records; let i = index"
          [class.bg-gray-50]="i % 2 === 1"
          class="hover:bg-gray-100 transition duration-200 ease-in-out">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.department }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.reviewYear }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.startDate }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.endDate }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.supervisor }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center gap-3 sm:gap-3">
                <!-- Edit Button -->
            <div class="relative group">
              <button 
              class="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-900 transition text-xs sm:text-sm font-semibold" 
              title="Edit"
              aria-label="Edit Record">
                <i-lucide [img]="Edit" class="w-4 h-4 sm:w-5 sm:h-5"></i-lucide>
              </button>
              <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                Edit</span>
            </div>
              <!-- Delete Button -->
            <div class="relative group">
              <button 
              class="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 transition text-xs sm:text-sm font-semibold" 
              title="Delete"
              aria-label="Delete Record">
                <i-lucide [img]="Trash" class="w-4 h-4 sm:w-5 sm:h-5"></i-lucide>
              </button>
              <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                Delete</span>
            </div>
             </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PerformanceTableComponent {
  // Define the icons to be used
  readonly Edit = Edit;
  readonly Trash = Trash;

  headers = ['ID', 'Department', 'Review Year', 'Start Date', 'End Date', 'Name', 'Supervisor', 'Actions'];
  
  records: PerformanceRecord[] = [
    {
      id: 1,
      department: 'Engineering',
      reviewYear: 2024,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      name: 'John Doe',
      supervisor: 'Jane Smith'
    },
    {
      id: 2,
      department: 'Marketing',
      reviewYear: 2024,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      name: 'Alice Johnson',
      supervisor: 'Bob Wilson'
    }
  ];
}
