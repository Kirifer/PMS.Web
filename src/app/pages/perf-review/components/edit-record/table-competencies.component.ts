import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-table-competencies',
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
          <select [(ngModel)]="row.competency" (change)="updateLevels(row)" class="w-full p-1 border rounded text-sm" id="competency-{{i}}">
            <option *ngIf="!row.competency" value="" disabled>Select Competency</option>
            <option *ngIf="row.competency" [ngValue]="row.competency" disabled>
              <label for="competency-{{i}}" class="block text-xs font-medium text-gray-500">{{ row.competency.competency || row.competency }}</label>
            </option>
            <option *ngFor="let competency of competencyOptions" [value]="competency">{{ competency }}</option>
          </select>
        </td>

        <td class="px-6 py-4 text-sm text-gray-900">
          <input type="number" class="w-10 max-w-full border rounded text-sm" [(ngModel)]="row.weight" (input)="emitCompetencyChange()" />
        </td>

        <td class="px-6 py-4 text-sm text-gray-900">
          <select [(ngModel)]="row.level" (change)="updateDescription(row)" class="w-full p-1 border rounded text-sm">
            <option *ngIf="!row.level" value="" disabled>Select Level</option>
            <option *ngIf="row.competency" [ngValue]="row.level" disabled>
              <label for="level-{{i}}" class="block text-xs font-medium text-gray-500">{{ row.competency.level || row.level }}</label>
            </option>
            <option *ngFor="let level of getLevelOptions(row.competency)" [value]="level">{{ level }}</option>
          </select>
        </td>

        <td class="px-6 py-4 max-w-lg text-sm text-gray-900">
          {{ row.description || row.competency.description || 'No description available' }}
        </td>
      </tr>
    </tbody>
  </table>
</div>

  `,
})
export class TableCompetenciesComponent implements OnInit {
  @Input() competencyData!: any[]; // Existing competency data
  @Input() competencyOptions: string[] = []; // List of available competencies
  @Input() competencies: any[] = []; // Full competencies list from the parent
  @Output() competencyChange = new EventEmitter<any[]>();

  ngOnInit(): void {
    console.log('Initial competencyData:', this.competencyData);
    console.log('Initial competencyOptions:', this.competencyOptions);
    console.log('Full Competencies:', this.competencies);
  }

  constructor(private cd: ChangeDetectorRef) {}

  emitCompetencyChange(): void {
    this.competencyChange.emit([...this.competencyData]); // Ensure a new reference is passed
  }
  
  onCompetencyChange(row: any): void {
    row.level = ''; // Reset dependent fields
    row.description = '';
    this.emitCompetencyChange();
  }

  // Get the levels for the selected competency
  getLevelOptions(selectedCompetency: string): string[] {
    if (!selectedCompetency) return [];
    return [
      ...new Set(
        this.competencies
          .filter((item) => item.competency === selectedCompetency)
          .map((item) => item.level)
      ),
    ];
  }

  // Update available levels when the competency changes
  updateLevels(row: any): void {
    row.level = ''; // Reset level
    row.description = ''; // Reset description
    this.emitCompetencyChange();
  }

  // Update the description based on selected competency and level
  updateDescription(row: any): void {
    const match = this.competencies.find(
      (item) => item.competency === row.competency && item.level === row.level
    );
    row.description = match?.description || 'No description available';
    row.competencyId = match?.id || null;
    this.emitCompetencyChange();
  }
}
