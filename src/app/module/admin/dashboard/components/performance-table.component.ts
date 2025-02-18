import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
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
  imports: [NgFor, LucideAngularModule], // Add LucideAngularModule
  template: `
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th *ngFor="let header of headers" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let record of records">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.department }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.reviewYear }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.startDate }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.endDate }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.supervisor }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-indigo-600 hover:text-indigo-900 mr-3">
                <i-lucide [img]="Edit" class="w-5 h-5"></i-lucide> <!-- Edit Icon -->
              </button>
              <button class="text-red-600 hover:text-red-900">
                <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide> <!-- Delete Icon -->
              </button>
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
