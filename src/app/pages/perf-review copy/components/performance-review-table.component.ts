import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddPerformanceReviewComponent } from './add-record/add-performance-review.component';
import { InfoDialog } from './info-dialog.component';
import { EditHahaPerformanceReviewComponent } from './edit-record/edit-performance-review.component';

export interface PerformanceRecord {
  id: string;
  name: string;
  departmentType: string;
  startYear: number;
  endYear: number;
  startDate: string;
  endDate: string;
  employeeId: string;
  supervisorId: string;
  goals: Goal[];
  competencies: Competency[];
}

interface Goal {
  orderNo: number;
  goals: string;
  weight: number;
  date: string;
  measure4: string;
  measure3: string;
  measure2: string;
  measure1: string;
}

interface Competency {
  competencyId: string;
  orderNo: number;
  weight: number;
  competency: competency;
}

interface competency {
  id: string;
  description: string;
  competency: string;
  level: string;
  isActive: boolean;
}

@Component({
  selector: 'app-performance-review-table',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
    CommonModule,
    AddPerformanceReviewComponent,
    EditHahaPerformanceReviewComponent,
    InfoDialog,
  ],
  template: `<div class="flex justify-between items-center mb-6">
      <input
        (keyup)="applyFilter($event)"
        placeholder="Search records"
        #input
        class="px-4 py-2 border rounded-lg shadow-sm flex-grow mr-4"
      />
      <!-- Add Record Button -->
      <button
        (click)="openAddDialog()"
        class="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
      >
        Add Record
      </button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              *ngFor="let header of headers"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let record of performanceReviews">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <!-- {{ record.id }} -->
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button (click)="openInfoDialog(record.id)">
                {{ record.departmentType }}
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.startYear }} - {{ record.endYear }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.startDate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.endDate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.supervisorId }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                (click)="openEditDialog(record.id)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                <i-lucide [img]="Edit" class="w-5 h-5"></i-lucide>
              </button>
              <button
                class="text-red-600 hover:text-red-900"
                (click)="deleteRecord(record.id)"
              >
                <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <app-add-performance-review
        *ngIf="isAddDialogOpen"
        (updateTable)="onAddRecord($event)"
        (close)="closeAddDialog()"
      />
      <app-info-dialog
        *ngIf="isInfoDialogOpen"
        [id]="selectedId"
        (close)="closeInfoDialog()"
        [competencies]="competencies"
      />

      <!-- Edit Record Dialog -->
      <app-edit-haha-performance-review
        *ngIf="isEditDialogOpen"
        [id]="selectedId"
        (close)="closeEditDialog()"
      ></app-edit-haha-performance-review>
    </div> `,
})
export class PerformanceReviewTableComponent implements OnInit {
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  selectedId: string | undefined;
  http = inject(HttpClient);
  competencies: any[] = [];
  tableData: any[] = [];

  onUpdateTable(event: { success: boolean; newData: any }) {
    if (event.success) {
      this.performanceReviews = [...this.performanceReviews, event.newData];
      this.allPerformanceReviews = [...this.performanceReviews];
      console.log('Updated table data:', this.performanceReviews);
    }
  }

  performanceReviews$ = this.getPerformanceReviews();

  private getPerformanceReviews(): Observable<any> {
    return this.http.get<any>('https://localhost:7012/performance-reviews');
  }

  ngOnInit() {
    this.performanceReviews$.subscribe(
      (data: any) => {
        if (data && data.data) {
          this.performanceReviews = data.data;
          this.allPerformanceReviews = [...this.performanceReviews];
          console.log('Performance Review Data:', this.performanceReviews);
        }
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
      }
    );
    this.fetchCompetencies();
    this.loadPerformanceReviews();
  }

  loadPerformanceReviews() {
    this.http.get<any>('https://localhost:7012/performance-reviews').subscribe(
      (data) => {
        if (data?.data) {
          this.performanceReviews = data.data;
          this.allPerformanceReviews = [...this.performanceReviews];
        }
      },
      (error) => console.error('Error fetching performance reviews:', error)
    );
  }

  fetchCompetencies(): void {
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (data) => {
        if (data?.data) {
          this.competencies = data.data;

          // console.log('Fetched competencies:', this.competencies); // Log the fetched data
          // console.log('Competency options:', this.competencyOptions); // Log the unique competency options
        }
      },
      (error) => console.error('Error fetching competencies:', error)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue) {
      this.performanceReviews = this.allPerformanceReviews.filter((record) =>
        Object.values(record).join(' ').toLowerCase().includes(filterValue)
      );
    } else {
      this.performanceReviews = [...this.allPerformanceReviews];
    }
  }

  deleteRecord(id: string) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.http
        .delete<any>(`https://localhost:7012/performance-reviews/${id}`)
        .subscribe({
          next: () => {
            this.performanceReviews = this.performanceReviews.filter(
              (record) => record.id !== id
            );
            this.allPerformanceReviews = this.allPerformanceReviews.filter(
              (record) => record.id !== id
            );
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            alert('Failed to delete the record. Please try again.');
          },
        });
    }
  }

  readonly Edit = Edit;
  readonly Trash = Trash;

  headers = [
    'ID',
    'Department',
    'Review Year',
    'Start Date',
    'End Date',
    'Name',
    'Supervisor',
    'Actions',
  ];

  isAddDialogOpen = false;
  isEditDialogOpen = false;
  isInfoDialogOpen = false;

  // Methods for dialogs
  openAddDialog() {
    this.isAddDialogOpen = true;
  }

  closeAddDialog() {
    this.isAddDialogOpen = false;
  }
  openEditDialog(id: string) {
    this.selectedId = id; // Set the selected record ID
    this.isEditDialogOpen = true; // Open the dialog
  }

  closeEditDialog() {
    this.isEditDialogOpen = false; // Close the dialog
    this.selectedId = undefined; // Reset the selected ID
  }

  openInfoDialog(id: string) {
    this.selectedId = id;
    this.isInfoDialogOpen = true;
  }

  closeInfoDialog() {
    this.isInfoDialogOpen = false;
  }

  // Add Record Update
  onAddRecord(event: { success: boolean; newData: PerformanceRecord }) {
    if (event.success) {
      this.performanceReviews = [...this.performanceReviews, event.newData];
      this.allPerformanceReviews = [...this.performanceReviews];
      console.log('New record added:', event.newData);
    }
  }
}