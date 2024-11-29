import { Component, ViewChild, Input, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { EditTableCompetenciesComponent } from './tabs/dialog-competencies.component';
import { EditTableGoalsComponent } from './tabs/dialog-goals.component';
import { EditFormEmployeeComponent } from './tabs/dialog-employee.component';
import { EditConfirmationComponent } from "./tabs/dialog-confirmation.component";
import { PerformanceRecord } from '../performance-review-table.component';
import { ToastComponent } from '../../../../components/toast/toast.component';
import {
  EMPLOYEE_INITIAL_STATE,
  EMPLOYEE_DATA_INITIAL_STATE,
  COMPETENCY_DATA_INITIAL_STATE,
  GOALS_DATA_INITIAL_STATE,
  TABS,
  LOOKUP_USERS,
} from './constants/data.constants';

@Component({
  selector: 'app-edit-performance-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
    CommonModule,
    EditTableCompetenciesComponent,
    EditTableGoalsComponent,
    EditFormEmployeeComponent,
    EditConfirmationComponent,
    ToastComponent
  ],
  template: `
  <div
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg  w-3/4 p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Edit Performance Review</h2>
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
            <app-edit-dialog-employee
              [employeeData]="employeeData"
              [lookUpUsers]="lookUpUsers" 
              (startDateChange)="onStartDateChange($event)"
              (endDateChange)="onEndDateChange($event)"
              
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 1">
            <app-edit-dialog-goals
              [goalsData]="goalsData"
              [startDate]="employee.startDate"
              [endDate]="employee.endDate"
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 2">
            <app-edit-dialog-competencies
              [competencyData]="competencyData"
              [competencyOptions]="competencyOptions"
              [competencies]="competencies"
              (competencyChange)="onRowsChange($event)"
              
            />
          </ng-container>
          <ng-container *ngIf="activeTab === 3">
          <app-edit-dialog-confirmation
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

    </div>`, 
})
export class EditPerformanceReviewComponent implements OnChanges, OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() updateTable = new EventEmitter<{ success: boolean; updatedData: PerformanceRecord }>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @Input() performanceRecord: PerformanceRecord | null = null;
  @Input() performanceReviews$: any;  
  @Input() performanceRecordNotNull: PerformanceRecord = {
    id: '',
    name: '',
    departmentType: '',
    startYear: 0,
    endYear: 0,
    startDate: '',
    endDate: '',
    employeeId: '',
    supervisorId: '',
    goals: [],
    competencies: [],
  };
  
  employee = { ...EMPLOYEE_INITIAL_STATE };
  employeeData = { ...EMPLOYEE_DATA_INITIAL_STATE };
  competencyData = [...COMPETENCY_DATA_INITIAL_STATE];
  goalsData = [...GOALS_DATA_INITIAL_STATE];
  lookUpUsers = [...LOOKUP_USERS];
  activeTab = 0;
  tabs = [...TABS];
  competencies: { competency: string }[] = [];
  competencyOptions: any[] = [];
  performanceReviews: any[] = [];
  allPerformanceReviews: any[] = [];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchLookupUsers(); 
    if (this.performanceReviews$) {
      this.performanceReviews$.subscribe(
        (data: any) => {
          if (data && data.data) {
            this.performanceReviews = data.data;
            this.allPerformanceReviews = [...this.performanceReviews];
            console.log('Performance Reviews:', this.performanceReviews);
          }
        },
        (error: any) => {
          console.error('Error fetching performance reviews:', error);
        }
      );
    }
    console.log(this.employeeData.name)
    this.fetchCompetencies();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['performanceRecord'] && this.performanceRecord) {

      this.populateFormData(this.performanceRecord);
      this.populateCompetencyOptions();
    } else {
      this.performanceRecord = {
        id: '',
        name: '',
        departmentType: '',
        startYear: 0,
        endYear: 0,
        startDate: '',
        endDate: '',
        employeeId: '',
        supervisorId: '',
        goals: [],
        competencies: [],
      };
      this.populateFormData(this.performanceRecord);
    }
  }
  
  onCompetencyChange(updatedData: any[]): void {
    this.competencyData = updatedData;
  }

  // onEmployeeDataChange(updatedData: any) {
  //   this.employeeData = updatedData;
  // }

  populateCompetencyOptions(): void {
    this.fetchCompetencies();
  }
  
  getUserFullName(userId: string): string | undefined {
    const user = this.lookUpUsers.find(u => u.id === userId);
    return user ? user.fullname : undefined;
  }

  
  populateFormData(record: PerformanceRecord) {
    this.employeeData = {
      id: record.id,
      name: this.getUserFullName(record.id) || record.name, // Fetch the full name from lookupUsers
      departmentType: record.departmentType,
      startYear: record.startYear,
      endYear: record.endYear,
      supervisorId: record.supervisorId,
      startDate: record.startDate,
      endDate: record.endDate,
      activeSupervisor: record.supervisorId !== '',
    };
  
    this.goalsData = record.goals.map((goal) => ({
      id: goal.id || '',
      orderNo: goal.orderNo,
      goals: goal.goals,
      weight: goal.weight,
      date: goal.date,
      measure4: goal.measure4,
      measure3: goal.measure3,
      measure2: goal.measure2,
      measure1: goal.measure1,
    }));
  
    this.competencyData = record.competencies.map((competency) => ({
      id: competency.id || '',
      competencyId: competency.competency.id || '',
      orderNo: competency.orderNo,
      weight: competency.weight || 0,
      competency: {
        id: competency.competency.id,
        description: competency.competency.description,
        competency: competency.competency.competency,
        level: competency.competency.level,
        isActive: competency.competency.isActive,
      },
    }));
  
    this.employee.startDate = record.startDate;
    this.employee.endDate = record.endDate;
  
    console.log('Populated Goals:', this.goalsData);
    console.log('Populated Competencies:', this.competencyData);
  }
  
  fetchCompetencies(): void {
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (data) => {
        if (data?.data) {
          this.competencies = data.data;
          this.competencyOptions = [...new Set(this.competencies.map((item) => item.competency))];
        }
      },
      (error) => console.error('Error fetching competencies:', error)
    );
  }

  fetchLookupUsers(): void {
    this.http.get<any>('https://localhost:7012/lookup/users').subscribe(
      (data) => {
        if (data?.data) {
          this.lookUpUsers = data.data;       
        }
        console.log('Lookup users', this.lookUpUsers);
      },
      (error) => console.error('Error fetching lookup users:', error)
    );
  }
  
  onRowsChange(updatedRows: any[]): void {
    this.competencyData = updatedRows;
    this.cd.detectChanges();
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

  closeDialog() {
    this.close.emit();
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

  mapCompetency(competency: any) {
    return {
      id: competency.id || '',
      competencyId: competency.competencyId || '',
      competency: {
        id: competency.competencyId && competency.competencyId !== '00000000-0000-0000-0000-000000000000' ? competency.competencyId : null,
        competency: competency.competency || '', 
        level: competency.level || '',
        description: competency.description || '',
        isActive: competency.isActive || false,
      },
      weight: competency.weight || 0,
      orderNo: competency.orderNo || 0,
    };
  }
  
  submitForm() {
    if (!this.performanceRecord) {
      this.performanceRecord = {
        id: '',
        name: '',
        departmentType: '',
        startYear: 0,
        endYear: 0,
        startDate: '',
        endDate: '',
        employeeId: '',
        supervisorId: '',
        goals: [],
        competencies: [],
      };
    }
  
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
  
    this.performanceRecord.goals = this.goalsData.map((goal: any) => ({
      id: goal.id || '',
      orderNo: goal.orderNo,
      goals: goal.goals || '',
      weight: goal.weight,
      date: `${this.employeeData.startYear}-${this.employeeData.endYear}`,
      measure4: goal.measure4 || '',
      measure3: goal.measure3 || '',
      measure2: goal.measure2 || '',
      measure1: goal.measure1 || '',
    }));
  
    const Payload = {
      id: this.employeeData.id,
      name: this.employeeData.name || '',
      departmentType: this.employeeData.departmentType || 'None',
      startYear: isNaN(this.employeeData.startYear) ? 0 : this.employeeData.startYear,
      endYear: isNaN(this.employeeData.endYear) ? 0 : this.employeeData.endYear,
      startDate: this.formatDate(this.employeeData.startDate),
      endDate: this.formatDate(this.employeeData.endDate),
      employeeId: this.employeeData.id || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      supervisorId: this.employeeData.supervisorId || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      goals: this.performanceRecord.goals,
      competencies: this.competencyData.map(this.mapCompetency),
    };
  
    this.http.put<any>(`https://localhost:7012/performance-reviews/${this.employeeData.id}`, Payload).subscribe(
      (response) => {
        console.log('Response from API:', response);
        this.closeDialog();
  
        this.updateTable.emit({
          success: true,
          updatedData: this.performanceRecord!,
        });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.updateTable.emit({
          success: false,
          updatedData: this.performanceRecord!,
        });
      }
    );
  }
  
}
