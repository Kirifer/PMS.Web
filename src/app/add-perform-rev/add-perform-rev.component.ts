import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICompetency } from '../models/competency';
import competencyData from './competency.json'




@Component({
  selector: 'app-add-perform-rev',
  templateUrl: './add-perform-rev.component.html',
  styleUrls: ['./add-perform-rev.component.css']
})
export class AddPerformRevComponent {
  
  
  competencies = competencyData;
  selectedCompetency: string = '';
  selectedLevel: string = '';

  // Get unique competencies
  getUniqueCompetencies(): string[] {
    return [...new Set(this.competencies.map(c => c.competency))];
  }

  // Get unique levels for selected competency
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

  // Get description based on selected competency and level
  getDescription(): string {
    const selected = this.competencies.find(c =>
      c.competency === this.selectedCompetency && c.level === this.selectedLevel
    );
    return selected ? selected.description : '';
  }
  

  
}




// export class AddPerformRevComponent {
  
//   competencies = competencyData;
//   selectedRows: { selectedCompetency: string, selectedLevel: string }[] = [
//     { selectedCompetency: '', selectedLevel: '' },
//     { selectedCompetency: '', selectedLevel: '' },
//     { selectedCompetency: '', selectedLevel: '' },
//     { selectedCompetency: '', selectedLevel: '' },
//     { selectedCompetency: '', selectedLevel: '' }
//   ];

//   // Get unique competencies
//   getUniqueCompetencies(): string[] {
//     return [...new Set(this.competencies.map(c => c.competency))];
//   }

//   // Get unique levels for selected competency
//   getUniqueLevelsForCompetency(rowIndex: number): string[] {
//     const selectedCompetency = this.selectedRows[rowIndex].selectedCompetency;
//     if (selectedCompetency) {
//       return [...new Set(
//         this.competencies
//           .filter(c => c.competency === selectedCompetency)
//           .map(c => c.level)
//       )];
//     }
//     return [];
//   }

//   // Get description based on selected competency and level
//   getDescription(rowIndex: number): string {
//     const selectedCompetency = this.selectedRows[rowIndex].selectedCompetency;
//     const selectedLevel = this.selectedRows[rowIndex].selectedLevel;
//     const selected = this.competencies.find(c =>
//       c.competency === selectedCompetency && c.level === selectedLevel
//     );
//     return selected ? selected.description : '';
//   }
// }
