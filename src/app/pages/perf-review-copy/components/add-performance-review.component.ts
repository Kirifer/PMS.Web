import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableCompetenciesComponent } from './table-competencies.component';
import { TableGoalsComponent } from './table-goals.component';
import { FormEmployeeComponent } from './form-employee-component.ts';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-add-performance-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    CommonModule,
    TableCompetenciesComponent,
    TableGoalsComponent,
    FormEmployeeComponent
  ],
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
        <!-- Dialog Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Add a Record</h2>
          <button
            (click)="closeDialog()"
            class="text-blue-900 focus:outline-none"
          >
            ✖
          </button>
        </div>

        <!-- Tabs -->
        <div class="mt-4 border-b">
          <ul class="flex justify-between space-x-4">
            <li
              *ngFor="let tab of tabs; let i = index"
              (click)="tabC(i)"
              [class.border-blue-500]="activeTab === i"
              [class.text-blue-500]="activeTab === i"
              [class.cursor-pointer]="isTabC[i]"
              [class.cursor-not-allowed]="!isTabC[i]"
              class="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-blue-500 hover:border-blue-300"
            >
              {{ tab.label }}
            </li>
          </ul>
        </div>

        <!-- Tab Content -->
        <div class="mt-4">
          <ng-container *ngIf="activeTab === 0">
            <!-- Bind to the event to proceed to goals when form is completed -->
            <app-form-employee (proceedToGoals)="onEmployeeDetailsProceed()"/>
          </ng-container>
          <ng-container *ngIf="activeTab === 1">
            <app-table-goals (allGoalsCompleted)="navigateToCompetencies()"></app-table-goals>
          </ng-container>
          <ng-container *ngIf="activeTab === 2">
            <app-table-competencies />
          </ng-container>
          <ng-container *ngIf="activeTab === 3">
            <p>Content for Tab 4</p>
          </ng-container>
        </div>

        <!-- Dialog Footer -->
        <div class="mt-6 flex justify-end space-x-4">
          <button
            (click)="closeDialog()"
            class="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AddPerformanceReviewComponent {
  @Output() close = new EventEmitter<void>();

  tabs = [
    { label: 'Employee Details' },
    { label: 'Goals' },
    { label: 'Competencies' },
    { label: 'Confirmation' },
  ];

  activeTab = 0;
  isTabC = [true, false, false, false]; // Initially disable the "Goals" tab

  // This method will be called when the Employee Details form is completed
  onEmployeeDetailsProceed() {
    // Enable the "Goals" tab and switch to it
    this.isTabC[1] = true; // Enable the "Goals" tab
    this.activeTab = 1; // Switch to the Goals tab (index 1)
  }

  // Handle tab click
  tabC(tabIndex: number) {
    if (this.isTabC[tabIndex]) {
      this.activeTab = tabIndex;
    }
  }

  // Switch to the Competencies tab
  navigateToCompetencies() {
    this.activeTab = 2; // Switch to the Competencies tab
  }

  // Close the dialog
  closeDialog() {
    this.close.emit();
  }
}
