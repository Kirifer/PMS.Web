import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddPerformanceReviewComponent } from './add-performance-review.component';

interface PerformanceRecord {
  id: string;
  name: string;
  departmentType: string;
  startYear: number;
  endYear: number;
  startDate: string;
  endDate: string;
  employeeId: string;
  supervisorId: string;
  goals: Goal[];
  competencies: Competency[];
  
}

interface Goal {
  orderNo: number;
  goals: string;
  weight: number;
  date: string;
  measure4: string;
  measure3: string;
  measure2: string;
  measure1: string;
}

interface Competency {
  competencyId: string;
  orderNo: number;
  weight: number;
}

@Component({
  selector: 'app-performance-review-table',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
    CommonModule,
    AddPerformanceReviewComponent, 
  ],
  templateUrl: './performance-rev.html',
})
export class PerformanceReviewTableComponent implements OnInit {
  
  editRecordId: string | null = null; 
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  http = inject(HttpClient);
  addUserForm: FormGroup; 
  isAddFormVisible = false; 
  competencies: any[] = []; 
  editUserForm: FormGroup; 
  isEditFormVisible = false; 

  
  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      departmentType: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      competencies: [[], Validators.required], // This expects an array of competency IDs
      goals: ['', Validators.required], 
    });
  
    // Initialize the edit user form
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      departmentType: ['', Validators.required],
      startYear: ['', [Validators.required, Validators.min(1900)]],
      endYear: ['', [Validators.required, Validators.min(1900)]],
      competencies: ['', Validators.required],  // Ensure competencies is required
      goals: ['', Validators.required],
    });
    
  }
  

  performanceReviews$ = this.getPerformanceReviews();

  private getPerformanceReviews(): Observable<any> {
    return this.http.get<any>('https://localhost:7012/performance-reviews');
  }

  ngOnInit() {
    this.performanceReviews$.subscribe(
      (data: any) => {
        if (data && data.data) {
          this.performanceReviews = data.data;
          this.allPerformanceReviews = [...this.performanceReviews];
          console.log('Performance Review Data:', this.performanceReviews);
        }
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
      }
    );
    this.getCompetencies();
  }

  private getCompetencies(): void {
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (competencyData) => {
        if (competencyData && competencyData.data) {
          // Assuming each competency object contains 'id' or 'uuid' as the identifier
          this.competencies = competencyData.data.map((competency: { id: string }) => competency.id); // Explicitly define the type as 'id'
          console.log('Competency IDs:', this.competencies);
        }
      },
      (error) => {
        console.error('Error fetching competencies:', error);
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue) {
      this.performanceReviews = this.allPerformanceReviews.filter((record) =>
        Object.values(record).join(' ').toLowerCase().includes(filterValue)
      );
    } else {
      this.performanceReviews = [...this.allPerformanceReviews];
    }
  }

  openAddUserForm() {
    this.isAddFormVisible = true; // Show the form when the button is clicked
  }

  openEditForm(record: PerformanceRecord) {
    this.editRecordId = record.id;
    this.editUserForm.patchValue({
      name: record.name,
      departmentType: record.departmentType,
      startYear: record.startYear,
      endYear: record.endYear,
      competencies: record.competencies.map(comp => comp.competencyId),  // Pre-fill competencies
      goals: record.goals,  // Assuming goals are handled similarly
    });
    this.isEditFormVisible = true;
  }

  cancelEdit() {
    this.isEditFormVisible = false;
    this.editUserForm.reset();
    this.editRecordId = null;
  }

  onEditSubmit() {
    console.log('Form Values:', this.editUserForm.value); // Log the form values
  
    if (this.editUserForm.valid && this.editRecordId) {
      const updatedRecord = {
        ...this.editUserForm.value,
        id: this.editRecordId,
      };
  
      // Ensure competencies are populated correctly as an array of competency IDs
      const competencies = updatedRecord.competencies?.map((competencyId: string) => ({
        competencyId,  // Use competencyId as string
        orderNo: 1,    // Example orderNo
        weight: 5,     // Example weight
      }));
      
      

      const updatedData = { ...updatedRecord, competencies };
  
      console.log('Updated Record:', updatedData); // Log the updated data
  
      this.http.put<any>(`https://localhost:7012/performance-reviews/${this.editRecordId}`, updatedData)
        .subscribe({
          next: (response) => {
            console.log('Record successfully updated:', response);
            this.performanceReviews = this.performanceReviews.map(record =>
              record.id === this.editRecordId ? { ...record, ...updatedData } : record
            );
            alert('Record updated successfully!');
          },
          error: (error) => {
            console.error('Error updating record:', error);
            alert('Failed to update the record. Please try again.');
          },
        });
    } else {
      console.error('Edit Form is invalid or record ID is missing:', this.editUserForm.errors);
      alert('Please fill out all required fields.');
    }
  }
  
  
  onSubmit() {
    if (this.addUserForm.valid) {
      const newRecord = this.addUserForm.value;
      console.log('Form Data being sent:', newRecord);

      // Construct competencies and goals
      const competencies = [
        {
          competencyId: newRecord.competencies,
          orderNo: 1,
          weight: 5,
        },
      ];

      const goals = [
        {
          orderNo: 1,
          goals: newRecord.goals,
          weight: 10,
          date: new Date().toISOString().split('T')[0],
          measure1: 'string',
          measure2: 'string',
          measure3: 'string',
          measure4: 'string',
        },
      ];

      const performanceData = {
        name: newRecord.name,
        departmentType: newRecord.departmentType,
        startYear: newRecord.startYear,
        endYear: newRecord.endYear,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        employeeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        supervisorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        goals: goals,
        competencies: competencies,
      };

      this.http
        .post<any>(
          'https://localhost:7012/performance-reviews',
          performanceData
        )
        .subscribe({
          next: (response) => {
            // Add the returned performance review with its ID
            if (response && response.data.id) {
              const performanceReviewWithId: PerformanceRecord = {
                ...performanceData,
                id: response.data.id, // Add the ID from the server response
              };

              // Add to the local arrays
              this.performanceReviews.push(performanceReviewWithId);
              this.allPerformanceReviews.push(performanceReviewWithId);

              // Close the form and reset it
              this.isAddFormVisible = false;
              this.addUserForm.reset();
            } else {
              alert('Failed to retrieve the ID after creation.');
            }
          },
          error: (err) => {
            console.error('Error adding record:', err);
            alert(
              'Failed to add the record. Please check the console for more details.'
            );
          },
        });
    } else {
      alert('Please fill out all required fields.');
    }
  }

  deleteRecord(id: string) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.http
        .delete<any>(`https://localhost:7012/performance-reviews/${id}`)
        .subscribe({
          next: () => {
            this.performanceReviews = this.performanceReviews.filter(
              (record) => record.id !== id
            );
            this.allPerformanceReviews = this.allPerformanceReviews.filter(
              (record) => record.id !== id
            );
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            alert('Failed to delete the record. Please try again.');
          },
        });
    }
  }

  readonly Edit = Edit;
  readonly Trash = Trash;

  headers = [
    'ID',
    'Department',
    'Review Year',
    'Start Date',
    'End Date',
    'Name',
    'Supervisor',
    'Actions',
  ];

  isDialogOpen = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
