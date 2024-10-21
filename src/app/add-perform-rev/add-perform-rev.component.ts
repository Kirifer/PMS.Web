import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LookupService } from '../services/lookup/lookup.service';
import { ICompetency } from '../models/competency';

import { PerformanceReviewService } from '../services/performanceReview/performance-review.service'; 
import { IUserData } from '../models/userData';

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


  // Employee Details ----------------------------------------------------------------------
  selectedDepartment: string = '';
  employeeName: string = '';
  supervisor: string = '';
  // Review Year
  startYear: number | null = null;
  endYear: number | null = null;

  startDate: string = '';
  endDate: string = '';
  
  activeSupervisor: boolean = false;

  departments: string[] = ['Human Resources', 'Finance', 'Sales', 'Marketing', 'Creative', 'Engaged', 'Engineering', 'Software Development', 'IT'];
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

  constructor(private lookupService: LookupService, 
              private httpClient: HttpClient,
              private reviewService: PerformanceReviewService) {

  }
  
  // Goals Array for Performance Review Table
  goals = [
    { id: 1, description: '', weight: '', date: '', rating: 0 },
    { id: 2, description: '', weight: '', date: '', rating: 0 },
    { id: 3, description: '', weight: '', date: '', rating: 0 },
    { id: 4, description: '', weight: '', date: '', rating: 0 },
    { id: 5, description: '', weight: '', date: '', rating: 0 }
  ];
  

  // Competency Section -------------------------------------------------------------------------------------------------------------------
  competencies: ICompetency[] = [];

  ngOnInit(): void {
    this.lookupService.getData().subscribe(
      (response) => { this.competencies = response.data; },
      (error) => { console.error('Error fetching competencies:', error); }
    );
    this.years = this.getYears();
  }

  selectedRows: { selectedCompetency: string, selectedLevel: string }[] = [
    { selectedCompetency: '', selectedLevel: '' },
    { selectedCompetency: '', selectedLevel: '' },
    { selectedCompetency: '', selectedLevel: '' },
    { selectedCompetency: '', selectedLevel: '' },
    { selectedCompetency: '', selectedLevel: '' }
  ];

  getUniqueCompetencies(): string[] {
    return [...new Set(this.competencies.map(c => c.competency))];
  }

  getUniqueLevelsForCompetency(): string[] {
    return [...new Set(this.competencies.map(c => c.level))];
  }

  getDescription(rowIndex: number): string {
    const selectedCompetency = this.selectedRows[rowIndex].selectedCompetency;
    const selectedLevel = this.selectedRows[rowIndex].selectedLevel;
    const selected = this.competencies.find(c => c.competency === selectedCompetency &&
      c.level === selectedLevel
    );
    return selected ? selected.description : '';
  }


  // Start Date & End Date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const month = monthNames[date.getMonth()];
    const day = date.getDate(); 
    const year = date.getFullYear(); 

    return `${month} ${day} ${year}`;
  }

  getFormattedStartDate(): string {
    return this.startDate ? this.formatDate(this.startDate) : '';
  }

  getFormattedEndDate(): string {
    return this.endDate ? this.formatDate(this.endDate) : '';
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
    const performanceReviewData: IUserData = {
        id: 0,  
        selectedDepartment: this.selectedDepartment,
        employeeName: this.employeeName,
        supervisor: this.supervisor,
        reviewYear: this.startYear ? this.startYear.toString() : '', 
        startDate: this.startDate,
        endDate: this.endDate,
        activeSupervisor: this.activeSupervisor,
        goals: this.goals.map((goal, index) => ({
            goalId: index + 1, //
            description: goal.description,
            completed: goal.rating > 0 
        })),
        competencies: this.selectedRows.map(row => ({
            competencyId: row.selectedCompetency ? this.getCompetencyId(row.selectedCompetency) : 0, 
            description: this.getDescription(this.selectedRows.indexOf(row)),
            level: row.selectedLevel ? parseInt(row.selectedLevel) : 0 
        })),
    };

    console.log('Submitting Performance Review Data:', performanceReviewData);

    this.reviewService.addPerformanceReview(performanceReviewData).subscribe(
        (response) => {
            console.log('Performance review submitted successfully:', response);
        },
        (error) => {
            console.error('Error submitting performance review:', error);
        }
    );
}

// Dummy function to get the competency ID; replace it with your actual logic.
getCompetencyId(competency: string): number {
    // Logic to retrieve competency ID based on competency name
    return 0; // Replace with actual ID retrieval logic
}

  
}