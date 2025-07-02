import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  LucideAngularModule,
  Edit,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddPerformanceReviewComponent } from './components/add-record/dialog-add-record.component';
import { InfoDialog } from './components/info-dialog/info-dialog.component';
import { EditPerformanceReviewComponent } from './components/edit-record/dialog-edit-record.component';
import { TableSkeletonComponent } from '@shared/components/loading/table-skeleton/table-skeleton.component';
import { PerformanceRecord } from '@app/core/models/performance.interface';
import { LookUpService } from '@app/core/services/lookup.service';
import { PerformanceReviewService } from '@app/core/services/performance-review.service';
import {
  TW_BUTTON,
  TW_BUTTON_CUSTOM,
  TW_BUTTON_MUTED,
  TW_BUTTON_SECONDARY,
  TW_INPUT,
  TW_TABLE_ROW,
  TW_BADGE,
  TW_BADGE_2,
  TW_BORDER,
} from '@app/styles/table-styles';

@Component({
  selector: 'app-performance-review',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    LucideAngularModule,
    CommonModule,
    AddPerformanceReviewComponent,
    EditPerformanceReviewComponent,
    InfoDialog,
    FormsModule,
    TableSkeletonComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-900 to-indigo-700 bg-clip-text text-transparent">
                Performance Review Management
              </h1>
              <p class="text-gray-600 mt-2 text-lg">
                Manage your performance reviews and their details here.
              </p>
            </div>
            <div class="flex items-center space-x-3">
              <div class="bg-blue-50 rounded-full p-3">
                <span class="text-2xl font-bold text-blue-900">{{ performanceReviews.length }}</span>
              </div>
              <span class="text-gray-600">Total Records</span>
            </div>
          </div>
          
          <!-- Enhanced Search and Filters -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div class="relative">
              <input
                (keyup)="applyFilter($event)"
                placeholder="Search records..."
                #input
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <select
              [(ngModel)]="departmentFilter"
              (change)="applyFilter()"
              class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Departments</option>
              <option *ngFor="let department of departments" [value]="department">
                {{ department }}
              </option>
            </select>

            <select
              [(ngModel)]="supervisorFilter"
              (change)="applyFilter()"
              class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Supervisors</option>
              <option *ngFor="let supervisor of supervisors" [value]="supervisor.id">
                {{ supervisor.name }}
              </option>
            </select>

            <button
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              (click)="openAddDialog()"
            >
              <i-lucide [img]="Plus" class="w-5 h-5"></i-lucide>
              <span>Add Record</span>
            </button>
          </div>
        </div>

        <!-- Enhanced Table -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div *ngIf="isLoading; else dataContent" class="p-8">
            <app-table-skeleton></app-table-skeleton>
          </div>

          <ng-template #dataContent>
            <!-- Empty State -->
            <div *ngIf="performanceReviews.length === 0" class="text-center py-12">
              <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No performance reviews found</h3>
              <p class="text-gray-500 mb-6">Get started by creating your first performance review record.</p>
              <button
                class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
                (click)="openAddDialog()"
              >
                Create First Record
              </button>
            </div>

            <!-- Table Content -->
            <div *ngIf="performanceReviews.length > 0" class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-gray-50 to-blue-50">
                  <tr>
                    <th *ngFor="let header of headers" class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    *ngFor="let record of performanceReviews; let i = index"
                    class="hover:bg-blue-50 transition-all duration-200 cursor-pointer group"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-4" (click)="openInfoDialog(record.id)">
                        <div class="flex items-center">
                          <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        </div>
                        
                        <div class="flex items-center space-x-3">
                          <div class="relative">
                            <img
                              src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                              alt="avatar"
                              class="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                            />
                            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                          </div>
                          
                          <div>
                            <div class="text-sm font-semibold text-gray-900">{{ record.employee.fullName }}</div>
                            <div class="text-sm text-gray-500">{{ record.departmentType }}</div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="px-6 py-4">
                      <span class="text-sm font-medium text-gray-900">{{ record.name }}</span>
                    </td>
                    
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ record.startYear }} - {{ record.endYear }}
                      </span>
                    </td>
                    
                    <td class="px-6 py-4 text-sm text-gray-900">{{ record.startDate }}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">{{ record.endDate }}</td>
                    
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span class="text-xs font-medium text-indigo-700">
                            {{ record.supervisor.fullName.charAt(0) }}
                          </span>
                        </div>
                        <span class="ml-2 text-sm text-gray-900">{{ record.supervisor.fullName }}</span>
                      </div>
                    </td>
                    
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-2">
                        <button
                          class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          (click)="openEditDialog(record)"
                        >
                          <i-lucide [img]="Edit" class="w-4 h-4"></i-lucide>
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          (click)="deleteRecord(record.id)"
                          [disabled]="isDeleting"
                        >
                          <i-lucide [img]="Trash" class="w-4 h-4"></i-lucide>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ng-template>
        </div>

        <!-- Enhanced Pagination -->
        <div *ngIf="performanceReviews.length > 0" class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">
                Showing <span class="font-semibold text-gray-900">{{ startItem }}</span> to 
                <span class="font-semibold text-gray-900">{{ endItem }}</span> of 
                <span class="font-semibold text-gray-900">{{ allPerformanceReviews.length }}</span> records
              </span>
              
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">Page</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                  {{ currentPage }}
                </span>
                <span class="text-sm text-gray-500">of {{ Math.ceil(allPerformanceReviews.length / itemsPerPage) }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                (click)="currentPage = currentPage - 1"
                [disabled]="currentPage === 1"
              >
                <i-lucide [img]="ChevronLeft" class="w-5 h-5"></i-lucide>
              </button>
              
              <button
                class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                (click)="currentPage = currentPage + 1"
                [disabled]="currentPage * itemsPerPage >= allPerformanceReviews.length"
              >
                <i-lucide [img]="ChevronRight" class="w-5 h-5"></i-lucide>
              </button>
            </div>
          </div>
        </div>

        <!-- Dialogs -->
        <div *ngIf="isAddDialogOpen">
          <app-add-performance-review
            (updateTable)="onAddRecord($event)"
            (close)="closeAddDialog()"
          />
        </div>

        <div *ngIf="isInfoDialogOpen">
          <app-info-dialog
            [id]="selectedId"
            (close)="closeInfoDialog()"
            [competencies]="competencies"
          />
        </div>

        <div *ngIf="isEditDialogOpen">
          <app-edit-performance-review
            [performanceRecord]="selectedRecord"
            (updateTable)="onEditRecord($event)"
            (close)="closeEditDialog()"
          />
        </div>
      </div>
    </div>
  `,
  providers: [PerformanceReviewService, LookUpService],
})
export class PerformanceReviewComponent implements OnInit {
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  selectedId: string | undefined;
  http = inject(HttpClient);
  competencies: any[] = [];
  tableData: any[] = [];
  totalItems: number = 0;
  departments: string[] = [];
  supervisors: { id: string; name: string }[] = [];
  departmentFilter: string = '';
  supervisorFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  startItem: number = 0;
  endItem: number = 0;

  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  private performanceReviewService = inject(PerformanceReviewService);
  private lookUpService = inject(LookUpService);

  // EditRecord
  selectedRecord: PerformanceRecord | null = null;

  // Loading states
  isLoading = false;
  isDeleting = false;

  onUpdateTable(event: { success: boolean; newData: any }) {
    if (event.success) {
      this.performanceReviews = [...this.performanceReviews, event.newData];
      this.allPerformanceReviews = [...this.performanceReviews];
      console.log('Updated table data:', this.performanceReviews);
    }
  }

  applyFilter(event?: Event) {
    const filterValue = event
      ? (event.target as HTMLInputElement).value.trim().toLowerCase()
      : '';

    this.performanceReviews = this.allPerformanceReviews.filter((record) => {
      const matchesSearch = filterValue
        ? Object.values(record).join(' ').toLowerCase().includes(filterValue) ||
          Object.values(record.employee)
            .join(' ')
            .toLowerCase()
            .includes(filterValue)
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

    this.currentPage = 1;
    this.updatePagination();
  }

  getPaginatedUsers(): PerformanceRecord[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allPerformanceReviews.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(
      this.currentPage * this.itemsPerPage,
      this.allPerformanceReviews.length
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePagination();
  }

  ngOnInit() {
    this.fetchCompetencies();
    this.fetchPerformanceReviews();
  }

  fetchPerformanceReviews() {
    this.isLoading = true;
    this.performanceReviewService.fetchPerformanceReview().subscribe(
      (data: any) => {
        if (data?.data) {
          this.performanceReviews = data.data;
          this.allPerformanceReviews = [...this.performanceReviews];
          this.totalItems = this.allPerformanceReviews.length;

          // Extract unique departments and supervisors
          this.departments = Array.from(
            new Set(this.performanceReviews.map((pr) => pr.departmentType))
          ).sort();

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
        this.isLoading = false;
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
        this.isLoading = false;
      }
    );
  }

  fetchCompetencies() {
    this.lookUpService.fetchCompetencies().subscribe(
      (data: any) => {
        if (data?.data) {
          this.competencies = data.data;
        }
      },
      (error) => console.error('Error fetching competencies:', error)
    );
  }

  deleteRecord(id: string) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.isDeleting = true;
      this.performanceReviewService.deleteRecord(id).subscribe({
        next: () => {
          this.performanceReviews = this.performanceReviews.filter(
            (record) => record.id !== id
          );
          this.allPerformanceReviews = this.allPerformanceReviews.filter(
            (record) => record.id !== id
          );
          this.isDeleting = false;
          // Add success toast notification here
        },
        error: (err) => {
          console.error('Error deleting record:', err);
          this.isDeleting = false;
          // Add error toast notification here
        },
      });
    }
  }

  readonly Edit = Edit;
  readonly Trash = Trash;
  readonly Plus = Plus;

  headers = [
    'Name',
    'Record Name',
    'Review Year',
    'Start Date',
    'End Date',
    'Supervisor',
    'Actions',
  ];

  isAddDialogOpen = false;
  isEditDialogOpen = false;
  isInfoDialogOpen = false;

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
      this.fetchPerformanceReviews();
    }
  }

  // Utility method for Math.ceil in template
  Math = Math;
}
