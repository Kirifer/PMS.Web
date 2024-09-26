import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import competencyData from './competency.json'
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './add-perform-rev.component.html',
  styleUrl: './add-perform-rev.component.css'
})
export class AddPerformRevComponent {
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
    // if (this.selectedCompetency) {
    //   return [...new Set(
    //     this.competencies
    //       .filter(c => c.competency === this.selectedCompetency)
    //       .map(c => c.level)
    //   )];
    // }
    // return [];
  }

  getDescription(rowIndex: number): string {
    const selectedCompetency = this.selectedRows[rowIndex].selectedCompetency;
    const selectedLevel = this.selectedRows[rowIndex].selectedLevel;
    const selected = this.competencies.find(c => c.competency === selectedCompetency && 
                                                 c.level === selectedLevel
    );
    return selected ? selected.description : '';
  }

}