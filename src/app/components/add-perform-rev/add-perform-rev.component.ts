import { Component, ViewChild, AfterViewInit, OnInit, Inject } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';

import { LookupService } from '../../services/lookup/lookup.service';
import { ICompetency } from '../../models/entities/competency';
import { DepartmentType } from '../../models/enumerations/departmentType';
import { DepartmentTypeDisplay } from '../../models/enumerations/departmentType';

import { PerformanceReviewService } from '../../services/performanceReview/performance-review.service'; 
import { IUserData } from '../../models/entities/userData';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Competency, Employee, Goal } from '../../models/class/employee';
import { ResponseModel } from '../../models/entities/response';
import { Payload } from '../../models/class/payload';

@Component({
  selector: 'app-add-perform-rev',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatTabGroup,
    MatSelectModule,
    HttpClientModule,
  ],
  templateUrl: './add-perform-rev.component.html',
  styleUrl: './add-perform-rev.component.css',
})
export class AddPerformRevComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup | undefined;

  ngOnInit(): void {
    this.getCompetencyLookUp();
    this.years = this.getYears();
  }
  constructor(
    private dialogRef: MatDialogRef<AddPerformRevComponent>,
    private lookupService: LookupService,
    private http: HttpClient,
    private reviewService: PerformanceReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    this.employeeObj.goals = Array.from({ length: 5 }, () => new Goal());
    this.employeeObj.competencies = Array.from({ length: 5 }, () => new Competency());
    
 
  }

  
  
  //#region Employee
  employeeObj: Employee = new Employee();

  activeSupervisor: boolean = false;
 
  //#endregion 
  

  submitForm() {
    const payload: Payload = {
        name: this.employeeObj.name,
        departmentType: this.employeeObj.departmentType,
        startYear: this.employeeObj.startYear,
        endYear: this.employeeObj.endYear,
        startDate: `${this.employeeObj.startDate.year}-${String(this.employeeObj.startDate.month).padStart(2, '0')}-${String(this.employeeObj.startDate.day).padStart(2, '0')}`,
        endDate: `${this.employeeObj.endDate.year}-${String(this.employeeObj.endDate.month).padStart(2, '0')}-${String(this.employeeObj.endDate.day).padStart(2, '0')}`,
        employeeId: '4f7b83d1-4495-4420-9b56-12a07becc9bb',
        supervisorId: 'b058d5eb-3f8c-4790-9e39-10a3f7efcc65',
        goals: this.employeeObj.goals.map((goal, index) => ({
            orderNo: index + 1, 
            goals: goal.goals,
            weight: goal.weight,
            date: `${this.employeeObj.startDate.year}-${String(this.employeeObj.startDate.month).padStart(2, '0')}-${String(this.employeeObj.startDate.day).padStart(2, '0')} - ${this.employeeObj.endDate.year}-${String(this.employeeObj.endDate.month).padStart(2, '0')}-${String(this.employeeObj.endDate.day).padStart(2, '0')}`,
            measure4: goal.measure4,
            measure3: goal.measure3,
            measure2: goal.measure2,
            measure1: goal.measure1
        })),
        competencies: this.employeeObj.competencies
            .filter(competency => competency.competencyId)  
            .map(competency => ({
                orderNo: competency.orderNo,
                competencyId: `${competency.competencyId}`,  
                weight: competency.weight
            }))
    };

    console.log('Employee data to be sent:', payload);

    this.reviewService.addEmployee(payload).subscribe(
      (res: ResponseModel) => {
        console.log('Employee added successfully:', res);
        this.dialogRef.close(true);
      },
      (error) => {
        alert("Error to submit!");
        this.dialogRef.close();
        // console.error('Error adding employee:', error);
        // console.log('API validation errors:', error.error?.errors);
      }
    );
}



  onCancel(): void {
    this.dialogRef.close();
  }
  




  //#region Function

  onStartDateChange(date: Date): void {
    this.employeeObj.startDate.setDate(date);
  }
  onEndDateChange(date: Date): void {
    this.employeeObj.endDate.setDate(date);
  }
  competencies: ICompetency[] = [];

  getUniqueCompetencies(): string[] {
    return [...new Set(this.competencies.map((c) => c.competency))];
  }
  getUniqueLevels(selectedCompetency: string): string[] {
    return [...new Set(this.competencies.map((c) => c.level))];
  }
  getDescription(rowIndex: number): { description: string; competencyId: string | null } {
    const selectedCompetency = this.employeeObj.competencies[rowIndex].competency;
    const selectedLevel = this.employeeObj.competencies[rowIndex].level;
  
    const selected = this.competencies.find(
      (c) => c.competency === selectedCompetency && c.level === selectedLevel
    );
    const competencyId = selected?.id || '';
    const description = selected ? selected.description : '';
  
    return { description, competencyId };
  }
  updateGoals(index: number): void {
    this.employeeObj.goals[index].orderNo = index + 1;
  }
  updateCompetency(index: number): void {
    this.employeeObj.competencies[index].orderNo = index + 1;
  
    const { description, competencyId } = this.getDescription(index);
  
    this.employeeObj.competencies[index].description = description;
    this.employeeObj.competencies[index].competencyId = competencyId as string;
  }

  departmentType = Object.keys(DepartmentType).map((key) => ({
    value: DepartmentType[key as keyof typeof DepartmentType],
    display: DepartmentTypeDisplay[key as keyof typeof DepartmentTypeDisplay],
  }));


  getCompetencyLookUp() {
    this.lookupService.getCompetency().subscribe(
      (response: ResponseModel) => {
        this.competencies = response.data; 
      },
      (error) => {
        console.error('Error fetching competencies:', error);
      }
    );
  }
  years: number[] = [];
  getYears(): number[] {
    const years: number[] = [];
    const startYear = 2000;
    const endYear = 2070;
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }

}
