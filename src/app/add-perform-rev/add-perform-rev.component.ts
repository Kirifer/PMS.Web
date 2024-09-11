import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IPerformanceReview } from '../models/performanceReview';


@Component({
  selector: 'app-add-perform-rev',
  templateUrl: './add-perform-rev.component.html',
  styleUrls: ['./add-perform-rev.component.css']
})
export class AddPerformRevComponent {
  empForm: FormGroup;


  categ: string[] = [
    'Office Supply'
  ];

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddPerformRevComponent>
  ) {    
      this.empForm = this._fb.group({
      code:'',
      // sequenceCode:'',
      category:'',
      item:'',
      color:'',
      size:'',
      quantity:'',
      supplyTaken:'',
    });
  }

  // CREATE
  onFormSubmit(){ 
    if(this.empForm.valid){
      const formData: IPerformanceReview = this.empForm.value;
      this.http.post('https://localhost:7012/supplycodes', formData).subscribe({
        next: response => {
          console.log('Data successfully submitted', response);
          this.dialogRef.close(true);
        },
        error: error => {
          console.error('Error submitting data', error);
        }
      });
    }
  }

  // CANCEL
  onCancel(): void{
    this.dialogRef.close(false)
  }



  onSubmit() {
    // Handle form submission
    console.log('Form submitted');
  }

  cancel() {
    // Handle cancel action
    console.log('Cancel clicked');
  }
}
