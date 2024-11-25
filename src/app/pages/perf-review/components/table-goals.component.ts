import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-goals',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="mt-5 overflow-x-auto bg-white rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table head -->
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No.
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Individual Goals
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Weight
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              4-Consistently Exceeds Expectations
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              3-Met and Sometimes Exceeds Expectations
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              2-Met Expectations
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              1-Did Not Meet Expectations
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of goalsData; let i = index">
            <th
              scope="row"
              class="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900"
            >
              {{ i + 1 }}
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea
                class="w-full p-1 border rounded text-center text-sm resize-none"
                rows="2"
                [(ngModel)]="row.goals"
              ></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <input
                type="number"
                class="w-full p-1 border rounded text-center text-sm"
                [(ngModel)]="row.weight"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <p>{{ startDate }} - {{ endDate }}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea
                class="w-full p-1 border rounded text-center text-sm resize-none"
                rows="2"
                [(ngModel)]="row.measure4"
              ></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea
                class="w-full p-1 border rounded text-center text-sm resize-none"
                rows="2"
                [(ngModel)]="row.measure3"
              ></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea
                class="w-full p-1 border rounded text-center text-sm resize-none"
                rows="2"
                [(ngModel)]="row.measure2"
              ></textarea>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <textarea
                class="w-full p-1 border rounded text-center text-sm resize-none"
                rows="2"
                [(ngModel)]="row.measure1"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Proceed button -->
      <div class="mt-4 flex justify-end">
        <button
          [disabled]="!allFieldsFilled()"
          (click)="onProceed()"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          Proceed
        </button>
      </div>
    </div>
  `,
})
export class TableGoalsComponent {
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() goalsData: any[] = [];

  @Output() goalsChange = new EventEmitter<any[]>();
  @Output() allGoalsCompleted = new EventEmitter<void>();

  emitGoalsChange() {
    this.goalsChange.emit(this.goalsData);
  }

  rows = Array(5)
    .fill(null)
    .map(() => ({
      goals: '',
      weight: null,
      measure4: '',
      measure3: '',
      measure2: '',
      measure1: '',
    }));

  allFieldsFilled(): boolean {
    return this.rows.every(
      (row) =>
        row.goals.trim() !== '' &&
        row.weight !== null &&
        row.measure4.trim() !== '' &&
        row.measure3.trim() !== '' &&
        row.measure2.trim() !== '' &&
        row.measure1.trim() !== ''
    );
  }

  onProceed() {
    if (this.allFieldsFilled()) {
      this.allGoalsCompleted.emit();
    }
  }
}
