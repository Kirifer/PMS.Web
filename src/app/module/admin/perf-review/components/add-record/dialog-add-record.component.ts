import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { DialogCompetenciesComponent } from './tabs/dialog-competencies.component';
import { DialogGoalsComponent } from './tabs/dialog-goals.component';
import { DialogEmployeeComponent } from './tabs/dialog-employee.component';
import { DialogConfirmationComponent } from './tabs/dialog-confirmation.component';
import { ToastComponent } from '../../../../../shared/components/toast/toast.component';
import {
  EMPLOYEE_INITIAL_STATE,
  EMPLOYEE_DATA_INITIAL_STATE,
  COMPETENCY_DATA_INITIAL_STATE,
  GOALS_DATA_INITIAL_STATE,
  TABS,
  LOOKUP_USERS,
  LOOKUP_SUPERVISORS,
} from './constants/data.constants';
import { PerformanceReviewService } from '@app/core/services/performance-review.service';
import { LookUpService } from '@app/core/services/lookup.service';

@Component({
  selector: 'app-add-performance-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
    CommonModule,
    DialogCompetenciesComponent,
    DialogGoalsComponent,
    DialogEmployeeComponent,
    DialogConfirmationComponent,
    ToastComponent,
  ],
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-h-[80vh] w-3/4 p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Add a Record</h2>
          <button
            (click)="closeDialog()"
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
          <ul class="flex justify-between space-x-4">
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
        <div class="mt-4 max-h-96 overflow-y-auto">
          <ng-container *ngIf="activeTab === 0">
            <app-dialog-employee
              [employeeData]="employeeData"
              [lookUpUsers]="lookUpUsers"
              [lookUpSupervisors]="lookUpSupervisors"
              (startDateChange)="onStartDateChange($event)"
              (endDateChange)="onEndDateChange($event)"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 1">
            <app-dialog-goals
              [goalsData]="goalsData"
              [startDate]="employee.startDate"
              [endDate]="employee.endDate"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 2">
            <app-dialog-competencies
              [competencyData]="competencyData"
              [competencies]="competencies"
              [competencyOptions]="competencyOptions"
              (competencyChange)="onRowsChange($event)"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 3">
            <app-dialog-confirmation
              [employeeData]="employeeData"
              [goalsData]="goalsData"
              [competencyData]="competencyData"
              [competencies]="competencies"
            />
          </ng-container>
        </div>
        <div class="mt-6 flex justify-end space-x-4">
          <button
            (click)="closeDialog()"
            class="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            (click)="submitForm()"
            class="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
      <app-toast></app-toast>
    </div>
  `,
  providers: [PerformanceReviewService, LookUpService],
})
export class AddPerformanceReviewComponent implements OnInit {
  @Output() updateTable = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  employee = { ...EMPLOYEE_INITIAL_STATE };
  employeeData = { ...EMPLOYEE_DATA_INITIAL_STATE };
  competencyData = [...COMPETENCY_DATA_INITIAL_STATE];
  goalsData = [...GOALS_DATA_INITIAL_STATE];
  lookUpUsers = [...LOOKUP_USERS];
  lookUpSupervisors = [...LOOKUP_SUPERVISORS];
  activeTab = 0;
  tabs = [...TABS];

  competencies: { competency: string }[] = [];
  competencyOptions: any[] = [];

  private performanceReviewService = inject(PerformanceReviewService);
  private lookUpService = inject(LookUpService);

  ngOnInit(): void {
    this.fetchCompetencies();
    this.fetchLookupUsers();
    this.fetchLookupSupervisors();
  }

  onRowsChange(updatedRows: any[]) {
    this.competencyData = updatedRows;
  }

  onStartDateChange(date: string) {
    this.employee.startDate = date;
    this.updateGoalsDateRange();
  }

  onEndDateChange(date: string) {
    this.employee.endDate = date;
    this.updateGoalsDateRange();
  }

  updateGoalsDateRange() {
    const dateRange = `${this.employee.startDate} - ${this.employee.endDate}`;
    this.goalsData.forEach((goal) => {
      goal.date = dateRange;
    });
  }

  formatDate(date: string): string {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  }

  showToast(message: string) {
    const toast = this.toastComponent;
    toast.show(message);
  }

  closeDialog() {
    this.close.emit();
  }

  fetchCompetencies(): void {
    this.lookUpService.fetchCompetencies().subscribe(
      (data) => {
        if (data?.data) {
          this.competencies = data.data;
          this.competencyOptions = [
            ...new Set(this.competencies.map((item) => item.competency)),
          ];
        }
      },
      (error) => console.error('Error fetching competencies:', error)
    );
  }

  fetchLookupUsers(): void {
    this.lookUpService.fetchUsers().subscribe(
      (data) => {
        if (data?.data) {
          this.lookUpUsers = data.data;
        }
        console.log(this.lookUpUsers);
      },
      (error) => console.error('Error fetching lookup users:', error)
    );
  }

  fetchLookupSupervisors(): void {
    this.lookUpService.fetchSupervisors().subscribe(
      (data) => {
        if (data?.data) {
          this.lookUpSupervisors = data.data;
        }
        console.log(this.lookUpSupervisors);
      },
      (error) => console.error('Error fetching lookup supervisors:', error)
    );
  }

  submitForm() {
    const startYear = new Date(this.employeeData.startDate).getFullYear() || 0;
    const endYear = new Date(this.employeeData.endDate).getFullYear() || 0;

    const supervisorId = this.employeeData.supervisor.id || '';
    const supervisorFullName = this.employeeData.supervisor.fullName || '';

    // if (
    //   !this.employeeData.name ||
    //   !this.employeeData.departmentType ||
    //   !this.employeeData.startDate ||
    //   !this.employeeData.endDate
    // ) {
    //   this.showToast('Please fill in all required employee fields!');
    //   return;
    // }

    // for (const goal of this.goalsData) {
    //   if (!goal.goals || goal.weight === 0 || !goal.date) {
    //     this.showToast('Please fill in all required goal fields!');
    //     return;
    //   }
    // }

    // const totalGoalWeight = this.goalsData.reduce(
    //   (sum, goal) => sum + goal.weight,
    //   0
    // );
    // if (totalGoalWeight !== 100) {
    //   this.showToast('The total weight for goals must equal 100%.');
    //   return;
    // }

    // for (const competency of this.competencyData) {
    //   if (!competency.competencyId || competency.weight === 0) {
    //     this.showToast('Please fill in all required competency fields!');
    //     return;
    //   }
    // }

    // const totalCompetencyWeight = this.competencyData.reduce(
    //   (sum, competency) => sum + competency.weight,
    //   0
    // );

    // if (totalCompetencyWeight !== 100) {
    //   this.showToast('The total weight for competencies must equal 100%.');
    //   return;
    // }

    const payload = {
      name: this.employeeData.name || '',
      departmentType: this.employeeData.departmentType || 'None',
      startYear: startYear,
      endYear: endYear,
      startDate: this.formatDate(this.employeeData.startDate),
      endDate: this.formatDate(this.employeeData.endDate),
      employeeId: this.employeeData.employee.id || '',
      supervisorId: supervisorId,
      supervisor: {
        id: supervisorId,
        fullName: supervisorFullName,
      },
      employee: {
        id: this.employeeData.employee.id || '',
        fullName: this.employeeData.employee.fullName || '',
      },
      supervisorFullName: supervisorFullName,
      goals: this.goalsData.map((goal: any) => ({
        orderNo: goal.orderNo,
        goals: goal.goals || '',
        weight: goal.weight,
        date: `${startYear}-${endYear}`,
        measure4: goal.measure4 || '',
        measure3: goal.measure3 || '',
        measure2: goal.measure2 || '',
        measure1: goal.measure1 || '',
      })),
      competencies: this.competencyData.map((competency: any) => ({
        id: competency.id || '',
        competencyId: competency.competencyId || '',
        orderNo: competency.orderNo || 0,
        weight: competency.weight || 0,
        competency: {
          id:
            competency.competencyId &&
            competency.competencyId !== '00000000-0000-0000-0000-000000000000'
              ? competency.competencyId
              : null,
          competency: competency.competency || '',
          level: competency.level || '',
          description: competency.description || '',
          isActive: competency.isActive || false,
        },
      })),
    };

    this.performanceReviewService.addRecord(payload).subscribe(
      (response) => {
        console.log('Response from API:', response);
        this.showToast('Record added successfully!');
        this.closeDialog();
      },
      (error) => {
        console.error('Error occurred:', error);
        this.showToast('Error adding record. Please try again.');
      }
    );

    this.updateTable.emit({
      success: true,
      newData: {
        ...this.employeeData,
      },
    });
  }
}
