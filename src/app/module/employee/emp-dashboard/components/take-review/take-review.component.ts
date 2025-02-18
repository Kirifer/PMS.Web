import { Component, EventEmitter, Output } from '@angular/core';
import { REVIEW_DETAILS, TABS } from '../constants/data.constants';
import { CommonModule } from '@angular/common';
import { DialogGoalsComponent } from '../tabs/dialog-goals/dialog-goals.component';
import { DialogCompetenciesComponent } from '../tabs/dialog-competencies/dialog-competencies.component';
import { DialogConfirmationComponent } from "../tabs/dialog-confirmation/dialog-confirmation.component";

@Component({
  selector: 'app-take-review',
  standalone: true,
  imports: [CommonModule, DialogGoalsComponent, DialogCompetenciesComponent, DialogConfirmationComponent],
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg h-[80%] w-[95%] p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Take Review</h2>
          <button
            (click)="closeTakeReviewDialog()"
            class="text-blue-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-4 border-b">
          <ul class="flex justify-evenly space-x-40">
            <li
              *ngFor="let tab of tabs; let i = index"
              (click)="activeTab = i"
              [class.border-blue-500]="activeTab === i"
              [class.text-blue-500]="activeTab === i"
              class="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-blue-500 hover:border-blue-300"
            >
              {{ tab.label }}
            </li>
          </ul>
        </div>
        <div class="mt-2 max-h-[75%] overflow-y-auto">
          <ng-container *ngIf="activeTab === 0">
            <app-dialog-goals [reviewDetails]="reviewDetails" />
          </ng-container>
          <ng-container *ngIf="activeTab === 1">
            <app-dialog-competencies [reviewDetails]="reviewDetails" />
          </ng-container>
          <ng-container *ngIf="activeTab === 2">
            <app-dialog-confirmation [reviewDetails]="reviewDetails" />
          </ng-container>
        </div>
        <div class="mt-6 flex justify-end space-x-4">
          <button
            (click)="closeTakeReviewDialog()"
            class="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <!-- <button
            (click)="submitForm()"
            class="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >
            Confirm
          </button> -->
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TakeReviewComponent {
  @Output() close = new EventEmitter<void>();

  activeTab = 0;
  tabs = TABS;
  reviewDetails: any = REVIEW_DETAILS;

  closeTakeReviewDialog() {
    this.close.emit();
  }
}
