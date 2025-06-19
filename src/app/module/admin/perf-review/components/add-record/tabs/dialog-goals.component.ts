import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-goals',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="mt-5 overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="min-w-full divide-y divide-gray-200 text-sm font-sans text-gray-800">
        <!-- Table head -->
        <thead class="bg-gray-50 text-sm text-gray-700 font-sans">
          <tr>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              No.
            </th>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              Individual Goals
            </th>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              Weight (%)
            </th>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              Date
            </th>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              4-Consistently Exceeds Expectations
            </th>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              3-Met and Sometimes Exceeds Expectations
            </th>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              2-Met Expectations
            </th>
            <th scope="col" class="px-6 py-3 text-left font-semibold tracking-wide">
              1-Did Not Meet Expectations
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of goalsData; let i = index" class="hover:bg-gray-50 transition">
            <th scope="row" class="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
              {{ i + 1 }}
            </th>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                class="w-full p-2 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                [(ngModel)]="row.goals"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                type="number"
                class="w-full p-2 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                [(ngModel)]="row.weight"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-700">
              {{ startDate }} - {{ endDate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                class="w-full p-2 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                [(ngModel)]="row.measure4"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                class="w-full p-2 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                [(ngModel)]="row.measure3"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                class="w-full p-2 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                [(ngModel)]="row.measure2"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                class="w-full p-2 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                [(ngModel)]="row.measure1"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class DialogGoalsComponent {
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() goalsData: any[] = [];
  @Output() goalsChange = new EventEmitter<any[]>();

  emitGoalsChange() {
    this.goalsChange.emit(this.goalsData);
  }
}
