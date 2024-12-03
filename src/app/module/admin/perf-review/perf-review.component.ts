import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Edit, Trash, Plus } from 'lucide-angular';
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

const TW_BUTTON_CUSTOM = 'bg-blue-900 text-white hover:bg-blue-700';
const TW_BUTTON = 'p-2 rounded-lg transition';
const TW_BUTTON_PRIMARY =
  'bg-primary text-primary-foreground hover:bg-primary/80';
const TW_BUTTON_ACCENT = 'bg-accent text-accent-foreground hover:bg-accent/80';
const TW_BUTTON_SECONDARY =
  'bg-secondary text-secondary-foreground hover:bg-secondary/80';
const TW_BUTTON_MUTED = 'bg-muted text-muted-foreground hover:bg-muted/80';
const TW_BORDER = 'border border-border';
const TW_INPUT =
  'border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary';
const TW_TABLE_ROW = 'border-b border-border hover:bg-muted/50 transition';
const TW_BADGE = 'bg-yellow-500 text-white px-2 py-1 rounded-full';
const TW_BADGE_2 = 'bg-violet-500 text-white px-2 py-1 rounded-full';
const TW_SHADOW = 'shadow-lg';
const TW_CARD = 'bg-card p-4 rounded-lg border border-primary';

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
                <i-lucide [img]="Plus" class="w-5 h-5 mr-2"></i-lucide>
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
                    <td class="p-4 flex items-center space-x-4">
                      <input type="checkbox" class="mr-2" />

                      <img
                        src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                        alt="avatar"
                        class="inline-block relative object-cover object-center !rounded-full w-10 h-10 border border-slate-400 p-0"
                      />

                      <div>
                        <span class="block font-bold">{{ record.name }}</span>
                        <span class="block text-sm text-muted-foreground">{{
                          record.departmentType
                        }}</span>
                      </div>

                      <div></div>
                    </td>
                    <!-- <td class="p-4">
                      <span
                        class="${TW_BADGE}"
                        [class.bg-green-500]="record.is_Active"
                        [class.bg-muted]="!record.is_Active"
                      >
                        {{ record.is_Active ? 'Active' : 'Inactive' }}
                      </span> -->
                      <!-- <span
                        class="${TW_BADGE_2}"
                        [class.bg-violet-500]="record.isSupervisor"
                        [class.bg-muted]="!record.isSupervisor"
                        [class.text-black]="!record.isSupervisor"
                      >
                        {{
                          record.isSupervisor ? 'Supervisor' : 'Non-Supervisor'
                        }}
                      </span> -->
                    <!-- </td> -->

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

        <div class="flex justify-between mt-4">
          <span class="text-muted-foreground">1 - 8 of 44</span>
          <div class="flex space-x-2">
            <button class="${TW_BUTTON} ${TW_BUTTON_SECONDARY}">1</button>
            <button class="${TW_BUTTON} ${TW_BUTTON_MUTED}">2</button>
            <button class="${TW_BUTTON} ${TW_BUTTON_MUTED}">3</button>
            <button class="${TW_BUTTON} ${TW_BUTTON_MUTED}">...</button>
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
  departments: string[] = [];
  supervisors: { id: string; name: string }[] = [];
  departmentFilter: string = '';
  supervisorFilter: string = '';

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
