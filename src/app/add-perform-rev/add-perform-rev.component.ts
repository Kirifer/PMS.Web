import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import competencyData from './competency.json';
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
    MatSelectModule
  ],
  templateUrl: './add-perform-rev.component.html',
  styleUrl: './add-perform-rev.component.css'
})
export class AddPerformRevComponent implements AfterViewInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup | undefined;

  // Review years
  reviewYears: number[] = [];
  selectedReviewYearStart: number;
  selectedReviewYearEnd: number;

  // Employee details
  employeeName: string = '';
  employee: string = '';
  startDate: string = '';
  endDate: string = '';
  supervisor: string = '';
  activeSupervisor: boolean = false;

  // Goals Array for Performance Review Table
  goals = [
    { id: 1, description: '', weight: '', date: '', rating: 0 },
    { id: 2, description: '', weight: '', date: '', rating: 0 },
    { id: 3, description: '', weight: '', date: '', rating: 0 },
    { id: 4, description: '', weight: '', date: '', rating: 0 },
    { id: 5, description: '', weight: '', date: '', rating: 0 }
  ];

  constructor() {
    const startYear = 2000;
    const endYear = new Date().getFullYear() + 1; // Include next year
    for (let year = startYear; year <= endYear; year++) {
      this.reviewYears.push(year);
    }
    this.selectedReviewYearStart = startYear;
    this.selectedReviewYearEnd = endYear;
  }

  ngAfterViewInit() {
    // Now this.tabGroup will be initialized and ready to use
  }

  competencies = competencyData;
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

  // Tab navigation functions
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
    // Handle form submission logic here
    console.log('Form submitted');
  }
}