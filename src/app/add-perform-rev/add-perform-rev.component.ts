import { Component, ViewChild, AfterViewInit, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LookupService } from '../services/lookup/lookup.service';
import { ICompetency } from '../models/entities/competency';
import { DepartmentType } from '../models/enumerations/departmentType';
import { DepartmentTypeDisplay } from '../models/enumerations/departmentType';

import { PerformanceReviewService } from '../services/performanceReview/performance-review.service'; 
import { IUserData } from '../models/entities/userData';

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
import { Competency, Employee, Goal } from '../models/class/employee';
import { ResponseModel } from '../models/entities/response';



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
    private httpClient: HttpClient,
    private reviewService: PerformanceReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeObj.goals = Array.from({ length: 5 }, () => new Goal());
    this.employeeObj.competencies = Array.from({ length: 5 }, () => new Competency());
  }

  
  // Employee Object Data------------------------------------------------------------->
  employeeObj: Employee = new Employee();

  onStartDateChange(date: Date): void {
    this.employeeObj.startDate.setDate(date);
  }
  onEndDateChange(date: Date): void {
    this.employeeObj.endDate.setDate(date);
  }
  activeSupervisor: boolean = false;


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
    const competencyId = selected ? selected.id : null;
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
    this.employeeObj.competencies[index].competencyId = competencyId;
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

  // -----------------------------------------------------------------------------------------------------------------------------

  debugEmployee(): void {

  }

  

  submitForm() {
    const employeeData = {
      payload: {
        name: this.employeeObj.name,
        departmentType: this.employeeObj.departmentType,
        startYear: this.employeeObj.startYear,
        endYear: this.employeeObj.endYear,
        startDate: {
            year: this.employeeObj.startDate.year,
            month: this.employeeObj.startDate.month,
            day: this.employeeObj.startDate.day,
            dayOfWeek: this.employeeObj.startDate.dayOfWeek 
        },
        endDate: {
            year: this.employeeObj.endDate.year,
            month: this.employeeObj.endDate.month,
            day: this.employeeObj.endDate.day,
            dayOfWeek: this.employeeObj.endDate.dayOfWeek 
        },
        employeeId: '1b8f8c6e-f48c-4b43-9274-65f022c2a57e',
        supervisorId: this.employeeObj.supervisorId,
        goals: this.employeeObj.goals.map(goal => ({
            orderNo: goal.orderNo,
            goals: goal.goals,
            weight: goal.weight,
            date: `${this.employeeObj.startDate.year}-${String(this.employeeObj.startDate.month).padStart(2, '0')}-${String(this.employeeObj.startDate.day).padStart(2, '0')} - ${this.employeeObj.endDate.year}-${String(this.employeeObj.endDate.month).padStart(2, '0')}-${String(this.employeeObj.endDate.day).padStart(2, '0')}`,
            measure4: goal.measure4,
            measure3: goal.measure3,
            measure2: goal.measure2,
            measure1: goal.measure1
        })),
        competencies: this.employeeObj.competencies
        .filter(competency => competency.competencyId !== null)  
        .map(competency => ({
            orderNo: competency.orderNo,
            competencyId: competency.competencyId as string,  
            weight: competency.weight
        }))
      }
       
    };

    console.log('Employee data to be sent:', employeeData);

    this.reviewService.addEmployee(employeeData).subscribe(
        (res: ResponseModel) => {
            console.log('Employee added successfully:', res);
            this.dialogRef.close(true);
        },
        (error) => {
            console.error('Error adding employee:', error);
            console.log('API validation errors:', error.error?.errors);
        }
    );
}





}



    // console.log(this.employeeObj);
    // console.log(`Employee Name: ${this.employeeObj.name}`);
    // console.log(`Department: ${this.employeeObj.departmentType}`);
    // console.log(`Review Year: ${this.employeeObj.startYear} - ${this.employeeObj.endYear}`);
    // console.log(`Start Date: ${this.employeeObj.startDate}`);
    // console.log(`Year: ${this.employeeObj.startDate.year}`);
    // console.log(`Month: ${this.employeeObj.startDate.month}`);
    // console.log(`Day: ${this.employeeObj.startDate.day}`);
    // console.log(`Dayofthe Week: ${this.employeeObj.startDate.dayOfWeek}`);

    // console.log(`End Date: ${this.employeeObj.endDate}`);
    // console.log(`Year: ${this.employeeObj.endDate.year}`);
    // console.log(`Month: ${this.employeeObj.endDate.month}`);
    // console.log(`Day: ${this.employeeObj.endDate.day}`);
    // console.log(`Dayofthe Week: ${this.employeeObj.endDate.dayOfWeek}`);
    
    // console.log(`Employee ID: ${this.employeeObj.employeeId}`);
    // console.log(`Supervisor ID: ${this.employeeObj.supervisorId}`);
    // this.employeeObj.goals.forEach((goals, index) => {
    //   console.log(`Goals ${index + 1}:`, goals);
    //   console.log(`Order No: ${goals.orderNo}`);
    //   console.log(`Goals: ${goals.goals}`);
    //   console.log(`Weight: ${goals.weight}`);
    //   console.log(`Measure4: ${goals.measure4}`);
    //   console.log(`Measure3: ${goals.measure3}`);
    //   console.log(`Measure2: ${goals.measure2}`);
    //   console.log(`Measure1: ${goals.measure1}`);
    // });
    // this.employeeObj.competencies.forEach((competency, index) => {
    //   console.log(`Competency ${index + 1}:`, competency);
    //   console.log(`Id: ${competency.competencyId}`);
    //   console.log(`OrderNo: ${competency.orderNo}`);
    //   console.log(`Competency: ${competency.competency}`);
    //   console.log(`Weight: ${competency.weight}`);
    //   console.log(`Level: ${competency.level}`);
    //   console.log(`Description: ${competency.description}`);
    // });
