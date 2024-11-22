import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-competencies',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="mt-5 overflow-x-auto bg-white rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              No.
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Competencies
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Weight
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Level
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of rows; let i = index">
            <td class="px-6 py-4 text-sm text-gray-900">{{ i + 1 }}</td>

            <!-- Competency Dropdown -->
            <td class="px-6 py-4 text-sm text-gray-900">
              <select
                [(ngModel)]="row.competency"
                (change)="updateLevels(row)"
                class="w-full p-1 border rounded text-sm"
              >
                <option value="" disabled selected>Select Competency</option>
                <option
                  *ngFor="let competency of competencyOptions"
                  [value]="competency"
                >
                  {{ competency }}
                </option>
              </select>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              <input
                type="number"
                class="w-10 max-w-full border rounded text-sm"
                [(ngModel)]="row.weight"
              />
            </td>
            <!-- Level Dropdown -->
            <td class="px-6 py-4 text-sm text-gray-900">
              <select
                [(ngModel)]="row.level"
                (change)="updateDescription(row)"
                class="w-full p-1 border rounded text-sm"
              >
                <option value="" disabled selected>Select Level</option>
                <option *ngFor="let level of row.levelOptions" [value]="level">
                  {{ level }}
                </option>
              </select>
            </td>

            <!-- Description -->
            <td class="px-6 py-4 max-w-lg text-sm text-gray-900">
              {{ row.description || 'No description selected' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class TableCompetenciesComponent {
  @Input() competencyData: any[] = [];
  rows: any[] = [];
  competencies: any[] = []; // Full competency data from API
  competencyOptions: string[] = []; // Unique competencies

  constructor(private http: HttpClient) {
    this.getCompetencies();
  }

  private getCompetencies(): void {
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (competencyData) => {
        if (competencyData && competencyData.data) {
          this.competencies = competencyData.data;

          this.competencyOptions = [
            ...new Set(this.competencies.map((item: any) => item.competency)),
          ];

          this.rows = Array.from({ length: 4 }, (_, index) => ({
            competency: '',
            competencyId: '',
            level: '',
            weight: 0, // Ensure weight is initialized here
            orderNo: index + 1, // Add order number here
            description: '',
          }));
        }
      },
      (error) => {
        console.error('Error fetching competencies:', error);
      }
    );
  }

  @Output() competencyChange = new EventEmitter<any[]>();

  emitCompetencyChange() {
    // Ensure 'weight' is passed along with 'competencyId' and 'orderNo'
    const filteredRows = this.rows.map((row) => ({
      competencyId: row.competencyId,
      weight: row.weight, // Pass weight
      orderNo: row.orderNo, // Include order number
    }));
    this.competencyChange.emit(filteredRows); // Emit the filtered data
  }

  updateDescription(row: any): void {
    const match = this.competencies.find(
      (item) => item.competency === row.competency && item.level === row.level
    );

    if (match) {
      row.description = match.description;
      row.competencyId = match.id;
    } else {
      row.description = 'No description available';
      row.competencyId = null;
    }

    this.emitCompetencyChange(); // Emit updated competency data
  }

  updateLevels(row: any): void {
    row.level = '';
    row.description = '';
    row.levelOptions = [
      ...new Set(
        this.competencies
          .filter((item: any) => item.competency === row.competency)
          .map((item: any) => item.level)
      ),
    ];

    this.emitCompetencyChange(); // Emit updated competency data
  }
}
