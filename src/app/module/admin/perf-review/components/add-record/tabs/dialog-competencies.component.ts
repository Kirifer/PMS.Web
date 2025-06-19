import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-competencies',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="mt-5 overflow-x-auto bg-white rounded-xl shadow-md">
      <table class="min-w-full divide-y divide-gray-200 text-sm font-sans text-gray-800">
        <thead class="bg-gray-50 text-gray-700 font-semibold tracking-wide">
          <tr>
            <th class="px-6 py-3 text-left text-xs uppercase">No.</th>
            <th class="px-6 py-3 text-left text-xs uppercase">Competencies</th>
            <th class="px-6 py-3 text-left text-xs uppercase">Weight</th>
            <th class="px-6 py-3 text-left text-xs uppercase">Level</th>
            <th class="px-6 py-3 text-left text-xs uppercase">Description</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr *ngFor="let row of competencyData; let i = index" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-gray-900 font-light">{{ i + 1 }}</td>
            <td class="px-6 py-4">
              <select
                [(ngModel)]="row.competency"
                (change)="updateLevels(row)"
                class="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled selected>Select Competency</option>
                <option *ngFor="let competency of competencyOptions" [value]="competency">
                  {{ competency }}
                </option>
              </select>
            </td>
            <td class="px-6 py-4">
              <input
                type="number"
                [(ngModel)]="row.weight"
                (input)="emitCompetencyChange()"
                class="w-16 p-2 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </td>
            <td class="px-6 py-4">
              <select
                [(ngModel)]="row.level"
                (change)="updateDescription(row)"
                class="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled selected>Select Level</option>
                <option *ngFor="let level of row.levelOptions" [value]="level">{{ level }}</option>
              </select>
            </td>
            <td class="px-6 py-4 max-w-lg text-gray-700 italic">
              {{ row.description || 'No description available' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class DialogCompetenciesComponent implements OnInit {
  @Input() competencyData: any[] = [];
  @Input() competencyOptions: string[] = [];
  @Input() competencies: any[] = [];
  @Output() competencyChange = new EventEmitter<any[]>();

  ngOnInit(): void {
    console.log('Initial competencyOptions:', this.competencyOptions);
    console.log('Initial competencies:', this.competencies);
  }

  emitCompetencyChange(): void {
    this.competencyChange.emit(this.competencyData);
  }

  updateLevels(row: any): void {
    row.level = '';
    row.description = '';
    row.levelOptions = [
      ...new Set(
        this.competencies
          .filter((item) => item.competency === row.competency)
          .map((item) => item.level)
      ),
    ];
    this.emitCompetencyChange();
  }

  updateDescription(row: any): void {
    const match = this.competencies.find(
      (item) => item.competency === row.competency && item.level === row.level
    );
    row.description = match?.description || 'No description available';
    row.competencyId = match?.id || null;
    this.emitCompetencyChange();
  }
}
