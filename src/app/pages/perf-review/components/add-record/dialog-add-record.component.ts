import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { DialogCompetenciesComponent } from './tabs/dialog-competencies.component';
import { DialogGoalsComponent } from './tabs/dialog-goals.component';
import { DialogEmployeeComponent } from './tabs/dialog-employee.component';
import { DialogConfirmationComponent } from './tabs/dialog-confirmation.component';
import { ToastComponent } from '../../../../components/toast/toast.component';
import {
  EMPLOYEE_INITIAL_STATE,
  EMPLOYEE_DATA_INITIAL_STATE,
  COMPETENCY_DATA_INITIAL_STATE,
  GOALS_DATA_INITIAL_STATE,
  TABS,
} from './constants/data.constants';

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
            ✖
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
})
export class AddPerformanceReviewComponent implements OnInit {
  @Output() updateTable = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  employee = { ...EMPLOYEE_INITIAL_STATE };
  employeeData = { ...EMPLOYEE_DATA_INITIAL_STATE };
  competencyData = [...COMPETENCY_DATA_INITIAL_STATE];
  goalsData = [...GOALS_DATA_INITIAL_STATE];
  activeTab = 0;
  tabs = [...TABS];
  competencies: { competency: string }[] = [];
  competencyOptions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCompetencies();
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
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
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

  submitForm() {
    const startYear = new Date(this.employeeData.startDate).getFullYear() || 0;
    const endYear = new Date(this.employeeData.endDate).getFullYear() || 0;

    if (
      !this.employeeData.name ||
      !this.employeeData.departmentType ||
      !this.employeeData.startDate ||
      !this.employeeData.endDate
    ) {
      this.showToast('Please fill in all required employee fields!');
      return;
    }

    for (const goal of this.goalsData) {
      if (!goal.goals || goal.weight === 0 || !goal.date) {
        this.showToast('Please fill in all required goal fields!');
        return;
      }
    }

    const totalGoalWeight = this.goalsData.reduce(
      (sum, goal) => sum + goal.weight,
      0
    );
    if (totalGoalWeight !== 100) {
      this.showToast('The total weight for goals must equal 100%.');
      return;
    }

    for (const competency of this.competencyData) {
      if (!competency.competencyId || competency.weight === 0) {
        this.showToast('Please fill in all required competency fields!');
        return;
      }
    }

    const totalCompetencyWeight = this.competencyData.reduce(
      (sum, competency) => sum + competency.weight,
      0
    );

    if (totalCompetencyWeight !== 100) {
      this.showToast('The total weight for competencies must equal 100%.');
      return;
    }

    const Payload = {
      name: this.employeeData.name || '',
      departmentType: this.employeeData.departmentType || 'None',
      startYear: startYear,
      endYear: endYear,
      startDate: this.formatDate(this.employeeData.startDate),
      endDate: this.formatDate(this.employeeData.endDate),
      employeeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      supervisorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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

    this.http
      .post<any>('https://localhost:7012/performance-reviews', Payload)
      .subscribe(
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

    this.updateTable.emit({ success: true, newData: this.employeeData });
  }
}
