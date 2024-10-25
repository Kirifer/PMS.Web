import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LookupService } from '../services/lookup/lookup.service';
import { ICompetency } from '../models/entities/competency';
import { DepartmentType } from '../models/enumerations/departmentType';
import { DepartmentTypeDisplay } from '../models/enumerations/departmentType';

import { PerformanceReviewService } from '../services/performanceReview/performance-review.service'; 
import { IUserData } from '../models/entities/userData';

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
    this.lookupService.getCompetency().subscribe(
      (response) => {
        this.competencies = response.data;
      },
      (error) => {
        console.error('Error fetching competencies:', error);
      }
    );
    this.years = this.getYears();
  }
  constructor(
    private lookupService: LookupService,
    private httpClient: HttpClient,
    private reviewService: PerformanceReviewService
  ) {
    this.employeeObj.goals = Array.from({ length: 5 }, () => new Goal());
    this.employeeObj.competencies = Array.from({ length: 5 }, () => new Competency());
  }


  // Employee Object Data------------------------------------------------------------->
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];

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


    console.log(this.employeeObj);
    console.log(`Employee Name: ${this.employeeObj.name}`);
    console.log(`Department: ${this.employeeObj.departmentType}`);
    console.log(`Review Year: ${this.employeeObj.startYear} - ${this.employeeObj.endYear}`);
    console.log(`Start Date: ${this.employeeObj.startDate}`);
    console.log(`Year: ${this.employeeObj.startDate.year}`);
    console.log(`Month: ${this.employeeObj.startDate.month}`);
    console.log(`Day: ${this.employeeObj.startDate.day}`);
    console.log(`Dayofthe Week: ${this.employeeObj.startDate.dayOfWeek}`);

    console.log(`End Date: ${this.employeeObj.endDate}`);
    console.log(`Year: ${this.employeeObj.endDate.year}`);
    console.log(`Month: ${this.employeeObj.endDate.month}`);
    console.log(`Day: ${this.employeeObj.endDate.day}`);
    console.log(`Dayofthe Week: ${this.employeeObj.endDate.dayOfWeek}`);
    
    console.log(`Employee ID: ${this.employeeObj.employeeId}`);
    console.log(`Supervisor ID: ${this.employeeObj.supervisorId}`);
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

  }

  // Tab navigation functions -------------------------------------------------------------------------------------------------------------
  goToNextTab() {
    if (
      this.tabGroup &&
      this.tabGroup.selectedIndex !== undefined &&
      this.tabGroup._tabs
    ) {
      const tabsLength = this.tabGroup._tabs.length;
      if (this.tabGroup.selectedIndex! < tabsLength - 1) {
        this.tabGroup.selectedIndex! += 1;
      }
    }
  }

  goToPreviousTab() {
    if (this.tabGroup && this.tabGroup.selectedIndex !== undefined) {
      if (this.tabGroup.selectedIndex! > 0) {
        this.tabGroup.selectedIndex! -= 1;
      }
    }
  }

  submitForm() {
    this.reviewService.addEmployee(this.employeeObj).subscribe(
      response => {
        console.log('Employee added successfully', response);
      },
      error => {
        console.error('Error adding employee', error);
      }
    );
  }


}

