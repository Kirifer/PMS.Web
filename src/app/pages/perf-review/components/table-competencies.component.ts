import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-competencies',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="mt-5 overflow-x-auto bg-white rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competencies</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of competencyData; let i = index">
            <td class="px-6 py-4 text-sm text-gray-900">{{ i + 1 }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">
              <select [(ngModel)]="row.competency" (change)="updateLevels(row)" class="w-full p-1 border rounded text-sm">
                <option value="" disabled selected>Select Competency</option>
                <option *ngFor="let competency of competencyOptions" [value]="competency">{{ competency }}</option>
              </select>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              <input type="number" class="w-10 max-w-full border rounded text-sm" [(ngModel)]="row.weight" (input)="emitCompetencyChange()" />
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              <select [(ngModel)]="row.level" (change)="updateDescription(row)" class="w-full p-1 border rounded text-sm">
                <option value="" disabled selected>Select Level</option>
                <option *ngFor="let level of row.levelOptions" [value]="level">{{ level }}</option>
              </select>
            </td>
            <td class="px-6 py-4 max-w-lg text-sm text-gray-900">
              {{ row.description || 'No description available' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class TableCompetenciesComponent implements OnInit {
  @Input() competencyData: any[] = [];
  @Input() competencyOptions: string[] = [];
  @Input() competencies: any[] = [];
  @Output() competencyChange = new EventEmitter<any[]>();
  ngOnInit(): void {
    console.log('Initial competencyData:', this.competencyOptions);
  }

  emitCompetencyChange(): void {
    this.competencyChange.emit(this.competencyData);
  }

  updateLevels(row: any): void {
    row.level = '';
    row.description = '';
    row.levelOptions = [
      ...new Set(this.competencies.filter((item) => item.competency === row.competency).map((item) => item.level)),
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
