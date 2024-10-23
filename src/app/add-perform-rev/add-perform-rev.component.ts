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
  constructor(private lookupService: LookupService, 
              private httpClient: HttpClient,
              private reviewService: PerformanceReviewService) 
  {}


  // Employee Details -----------------------------------------------------------------------------------
  selectedDepartment: string = '';
  employeeName: string = '';
  supervisor: string = '';
  activeSupervisor: boolean = false;

  // Review Year
  startYear: number | null = null;
  endYear: number | null = null;

  startDate: string = '';
  endDate: string = '';
  
 
  departmentType = Object.keys(DepartmentType).map(key => ({
    value: DepartmentType[key as keyof typeof DepartmentType],
    display: DepartmentTypeDisplay[key as keyof typeof DepartmentTypeDisplay]
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

  // Start Date & End Date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const month = monthNames[date.getMonth()];
    const day = date.getDate(); 
    const year = date.getFullYear(); 

    return `${month} ${day}, ${year}`;
  }
  getFormattedStartDate(): string {
    return this.startDate ? this.formatDate(this.startDate) : '';
  }
  getFormattedEndDate(): string {
    return this.endDate ? this.formatDate(this.endDate) : '';
  }

  
  // Goals Section ------------------------------------------------------------------------------------------------
  selectedGoals: 
  { goals: string, 
    weight: number, 
    measure4: string, 
    measure3: string, 
    measure2: string, 
    measure1: string
  }[] = 
  [
    { goals: '', weight: 0, measure4: '', measure3: '', measure2: '', measure1: '' },
    { goals: '', weight: 0, measure4: '', measure3: '', measure2: '', measure1: '' },
    { goals: '', weight: 0, measure4: '', measure3: '', measure2: '', measure1: '' },
    { goals: '', weight: 0, measure4: '', measure3: '', measure2: '', measure1: '' },
    { goals: '', weight: 0, measure4: '', measure3: '', measure2: '', measure1: '' },
  ];
   
  
  

  // Competency Section -------------------------------------------------------------------------------------------------------------------
  competencies: ICompetency[] = [];

  ngOnInit(): void {
    this.lookupService.getCompetency().subscribe(
      (response) => { this.competencies = response.data; },
      (error) => { console.error('Error fetching competencies:', error); }
    );
    this.years = this.getYears();
  }

  selectedRows: { selectedCompetency: string, selectedWeight:string, selectedLevel: string }[] = [
    { selectedCompetency: '', selectedWeight: '', selectedLevel: '' },
    { selectedCompetency: '', selectedWeight: '', selectedLevel: '' },
    { selectedCompetency: '', selectedWeight: '', selectedLevel: '' },
    { selectedCompetency: '', selectedWeight: '', selectedLevel: '' },
    { selectedCompetency: '', selectedWeight: '', selectedLevel: '' }
  ];

  getUniqueCompetencies(): string[] {
    return [...new Set(this.competencies.map(c => c.competency))];
  }

  getUniqueLevelsForCompetency(): string[] {
    return [...new Set(this.competencies.map(c => c.level))];
  }

  getDescription(rowIndex: number): { description: string, competencyId: string | null } {
    const selectedCompetency = this.selectedRows[rowIndex].selectedCompetency;
    const selectedLevel = this.selectedRows[rowIndex].selectedLevel;
    const selected = this.competencies.find(c => c.competency === selectedCompetency &&
      c.level === selectedLevel
    );

    const competencyId = selected ? selected.id : null;
    const description = selected ? selected.description : '';
  
    return { description, competencyId };
  }



  // Tab navigation functions -------------------------------------------------------------------------------------------------------------
  goToNextTab() {
    if (this.tabGroup && this.tabGroup.selectedIndex !== undefined && this.tabGroup._tabs) {
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
    const data = {
      name: this.employeeName,
      departmentType: this.selectedDepartment,
      startYear: this.startYear,
      endYear: this.endYear,
      startDate: this.startDate,
      endDate: this.endDate,
      // employeeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
      // supervisorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
      goals: this.selectedGoals.map((goal, index) => ({
        orderNo: index + 1,
        goals: goal.goals,
        weight: goal.weight,
        date: `${this.startDate} - ${this.endDate}`,
        measure4: goal.measure4,
        measure3: goal.measure3,
        measure2: goal.measure2,
        measure1: goal.measure1
      })),
      competencies: this.selectedRows.map((row, index) => ({
        orderNo: index + 1,
        // competencyId: this.getDescription(i).competencyId,
        weight: Number(row.selectedWeight)
      }))
    };

    
    // this.performanceReviewService.submitPerformanceReview(data)
    //   .subscribe(response => {
    //     console.log('Response from API: ', response);
    //   }, error => {
    //     console.error('Error: ', error);
    //   });
  }



}

