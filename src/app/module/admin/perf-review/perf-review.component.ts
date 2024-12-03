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
    <div
      class="h-[calc(100vh-.75rem)] bg-white mt-3 rounded-tl-2xl rounded-bl-2xl sm:px-6 lg:px-8"
    >
      <div class="max-w-full mx-auto py-3">
        <div class="p-2 bg-white rounded-lg mb-6">
          <h1 class="text-3xl font-semibold text-gray-900">
            Performance Review Management
          </h1>
          <p class="text-sm text-gray-600 mt-2">
            Manage your performance reviews and their details here.
          </p>

          <div class="flex justify-between items-center mt-4">
            <span class="text-lg font-bold">
              All Records
              <span class="text-muted-foreground"
                >({{ performanceReviews.length }})</span
              >
            </span>
            <div class="flex items-center">
              <input
                (keyup)="applyFilter($event)"
                placeholder="Search records"
                #input
                class="${TW_INPUT}"
              />
              <select
                [(ngModel)]="departmentFilter"
                (change)="applyFilter()"
                class="${TW_INPUT} ml-2 appearance-none pr-8"
              >
                <option value="">All Departments</option>
                <option
                  *ngFor="let department of departments"
                  [value]="department"
                >
                  {{ department }}
                </option>
              </select>

              <select
                [(ngModel)]="supervisorFilter"
                (change)="applyFilter()"
                class="${TW_INPUT} ml-2 appearance-none pr-5"
              >
                <option value="">All Supervisors</option>
                <option
                  *ngFor="let supervisor of supervisors"
                  [value]="supervisor.id"
                >
                  {{ supervisor.name }}
                </option>
              </select>

              <button
                class="ml-4 ${TW_BUTTON} ${TW_BUTTON_CUSTOM} flex items-center"
                (click)="openAddDialog()"
              >
                <i-lucide [img]="Plus" class="w-4 h-4"></i-lucide>
                Add Record
              </button>
            </div>
          </div>

          <div *ngIf="isLoading; else dataContent">
            <app-table-skeleton></app-table-skeleton>
          </div>

          <ng-template #dataContent>
            <div class="overflow-x-auto bg-white rounded-lg ${TW_BORDER} mt-4">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-muted text-muted-foreground">
                  <tr class="uppercase">
                    <th *ngFor="let header of headers" class="p-4 text-left">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    *ngFor="let record of performanceReviews; let i = index"
                    class="${TW_TABLE_ROW}"
                  >
                    <td
                      class="p-4 flex items-center space-x-4 cursor-pointer"
                      (click)="openInfoDialog(record.id)"
                    >
                      <input type="checkbox" class="mr-2" />

                      <img
                        src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                        alt="avatar"
                        class="inline-block relative object-cover object-center !rounded-full w-10 h-10 border border-slate-400 p-0"
                      />

                      <div>
                        <span class="block font-bold">{{
                          record.employee.fullName
                        }}</span>
                        <span class="block text-sm text-muted-foreground">{{
                          record.departmentType
                        }}</span>
                      </div>

                      <div></div>
                    </td>

                    <td class="p-4">
                      {{ record.name }}
                    </td>
                    <td class="p-4">
                      {{ record.startYear }} - {{ record.endYear }}
                    </td>
                    <td class="p-4">{{ record.startDate }}</td>
                    <td class="p-4">{{ record.endDate }}</td>
                    <td class="p-4">{{ record.supervisor.fullName }}</td>
                    <td class="p-4">
                      <button
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                        (click)="openEditDialog(record)"
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
            </div>
          </ng-template>

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

        <div class="flex justify-between">
          <span class="text-muted-foreground">
            Showing {{ startItem }} to {{ endItem }} of
            {{ allPerformanceReviews.length }} records
          </span>

          <div class="flex space-x-2">
            <button
              class="${TW_BUTTON} ${TW_BUTTON_MUTED}"
              (click)="currentPage = currentPage - 1"
              [disabled]="currentPage === 1"
            >
              <i-lucide
                [img]="ChevronLeft"
                class="w-7 h-7 hover:text-blue-900 hover:bg-gray-200 hover:rounded-md"
              ></i-lucide>
            </button>
            <button
              class="${TW_BUTTON} ${TW_BUTTON_MUTED}"
              (click)="currentPage = currentPage + 1"
              [disabled]="
                currentPage * itemsPerPage >= allPerformanceReviews.length
              "
            >
              <i-lucide
                [img]="ChevronRight"
                class="w-7 h-7  hover:text-blue-900 hover:bg-gray-200 hover:rounded-md"
              ></i-lucide>
            </button>
          </div>
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
          this.totalItems = this.allPerformanceReviews.length; // Set total items

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
    if (confirm('Are you sure you want to delete?')) {
      this.performanceReviewService.deleteRecord(id).subscribe({
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
      this.fetchPerformanceReviews();
    }
  }
}
