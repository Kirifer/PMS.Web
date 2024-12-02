import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Edit, Trash, Plus } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddPerformanceReviewComponent } from '../add-record/dialog-add-record.component';
import { InfoDialog } from '../info-dialog/info-dialog.component';
import { EditPerformanceReviewComponent } from '../edit-record/dialog-edit-record.component';
import { TableSkeletonComponent } from '../../../../shared/components/loading/table-skeleton/table-skeleton.component';
export interface PerformanceRecord {
  id: string;
  name: string;
  departmentType: string;
  startYear: number;
  endYear: number;
  startDate: string;
  endDate: string;
  supervisorId: string;
  employee: {
    id: string;
    fullName: string;
  };
  supervisor: {
    id: string;
    fullName: string;
  };
  goals: Goal[];
  competencies: Competency[];
  supervisorFullName: string;
}
export interface User {
  id: string;
  fullname: string;
}

export interface Goal {
  id: string;
  orderNo: number;
  goals: string;
  weight: number;
  date: string;
  measure4: string;
  measure3: string;
  measure2: string;
  measure1: string;
}

export interface Competency {
  id: string;
  competencyId: string;
  orderNo: number;
  weight: number;
  competency: competency;
}

export interface competency {
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
    EditPerformanceReviewComponent,
    InfoDialog,
    FormsModule,
    TableSkeletonComponent,
  ],
  template: `
    <div class="flex justify-between items-center mb-6">
      <input
        (keyup)="applyFilter($event)"
        placeholder="Search records"
        #input
        class="px-4 py-2 border rounded-lg shadow-sm flex-grow mr-4"
      />
      <!-- Department Filter -->
      <select
        [(ngModel)]="departmentFilter"
        (change)="applyFilter()"
        class="px-4 py-2 border rounded-lg shadow-sm mr-4"
      >
        <option value="">All Departments</option>
        <option *ngFor="let department of departments" [value]="department">
          {{ department }}
        </option>
      </select>

      <!-- Supervisor Filter -->
      <select
        [(ngModel)]="supervisorFilter"
        (change)="applyFilter()"
        class="px-4 py-2 border rounded-lg shadow-sm mr-4"
      >
        <option value="">All Supervisors</option>
        <option *ngFor="let supervisor of supervisors" [value]="supervisor.id">
          {{ supervisor.name }}
        </option>
      </select>
      <!-- Add Record Button -->
      <button
        (click)="openAddDialog()"
          class="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
      >
      <i-lucide [img]="Plus" class="w-5 h-5 mr-2"></i-lucide>
        Add Record
      </button>
    </div>

    <div *ngIf="isLoading; else dataContent">
      <app-table-skeleton></app-table-skeleton>
    </div>
    <ng-template #dataContent>

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
            <tr *ngFor="let record of performanceReviews; let i = index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ i + 1 }}
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
                {{ record.supervisor.fullName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  (click)="openEditDialog(record)"
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
        <app-edit-performance-review
          *ngIf="isEditDialogOpen"
          [performanceRecord]="selectedRecord"
          (updateTable)="onEditRecord($event)"
          (close)="closeEditDialog()"
        />
     
    </div>
    </ng-template>
  `,
})
export class PerformanceReviewTableComponent implements OnInit {
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  selectedId: string | undefined;
  http = inject(HttpClient);
  competencies: any[] = [];
  tableData: any[] = [];
  departments: string[] = [];
  supervisors: { id: string; name: string }[] = [];
  departmentFilter: string = '';
  supervisorFilter: string = '';
 

  // EditRecord
  selectedRecord: PerformanceRecord | null = null;

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

          // Filter unique departments
          this.departments = Array.from(
            new Set(this.performanceReviews.map((pr) => pr.departmentType))
          ).sort();

          // Filter unique supervisors by their ID
          const uniqueSupervisors = new Map(
            this.performanceReviews.map((pr) => [
              pr.supervisor.id,
              { id: pr.supervisor.id, name: pr.supervisor.fullName },
            ])
          );

          this.supervisors = Array.from(uniqueSupervisors.values()).sort(
            (a, b) => a.name.localeCompare(b.name)
          );
        }
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
      }
    );

    this.fetchCompetencies();
    this.loadPerformanceReviews();
  }

  applyFilter(event?: Event) {
    const filterValue = event
      ? (event.target as HTMLInputElement).value.trim().toLowerCase()
      : '';

    this.performanceReviews = this.allPerformanceReviews.filter((record) => {
      const matchesSearch = filterValue
        ? Object.values(record).join(' ').toLowerCase().includes(filterValue)
        : true;

      const matchesDepartmentFilter = this.departmentFilter
        ? record.departmentType === this.departmentFilter
        : true;

      const matchesSupervisorFilter = this.supervisorFilter
        ? record.supervisor.id === this.supervisorFilter
        : true;

      return (
        matchesSearch && matchesDepartmentFilter && matchesSupervisorFilter
      );
    });
  }

  loadPerformanceReviews() {
    this.isLoading = true;
    this.http.get<any>('https://localhost:7012/performance-reviews').subscribe(
      (data) => {
        if (data?.data) {
          this.performanceReviews = data.data;
          this.allPerformanceReviews = [...this.performanceReviews];
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
        this.isLoading = true;
      }
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
  readonly Plus = Plus;

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
  isLoading = false;

  openAddDialog() {
    this.isAddDialogOpen = true;
  }

  closeAddDialog() {
    this.isAddDialogOpen = false;
  }

  openEditDialog(record: PerformanceRecord) {
    this.selectedRecord = record || {
      id: '',
      name: '',
      departmentType: '',
      startYear: 0,
      endYear: 0,
      startDate: '',
      endDate: '',
      supervisorId: '',
      employee: {
        id: '',
        fullName: '',
      },
      supervisor: {
        id: '',
        fullName: '',
      },
      goals: [],
      competencies: [],
    };
    this.isEditDialogOpen = true;
  }

  closeEditDialog() {
    this.isEditDialogOpen = false;
  }

  openInfoDialog(id: string) {
    this.selectedId = id;
    this.isInfoDialogOpen = true;
  }

  closeInfoDialog() {
    this.isInfoDialogOpen = false;
  }

  onAddRecord(event: { success: boolean; newData: PerformanceRecord }) {
    if (event.success) {
      this.performanceReviews = [...this.performanceReviews, event.newData];
      this.allPerformanceReviews = [...this.performanceReviews];
      console.log('New record added:', event.newData);
    }
  }

  onEditRecord(event: { success: boolean; updatedData: PerformanceRecord }) {
    if (event.success) {
      console.log('Record successfully updated:', event.updatedData);
      this.loadPerformanceReviews();
    }
  }
}
