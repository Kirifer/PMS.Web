import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './performance-rev.html',
})
export class PerformanceReviewTableComponent implements OnInit {
  
  editRecordId: string | null = null; // ID of the record being edited
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  http = inject(HttpClient);
  addUserForm: FormGroup; // FormGroup for adding a user
  isAddFormVisible = false; // Flag to toggle Add User form
  competencies: any[] = []; // Add this property to hold competencies
  editUserForm: FormGroup; // FormGroup for editing
  isEditFormVisible = false; // Toggle for the Edit Form

  
  constructor(private fb: FormBuilder) {
    // Initialize the add user form
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      departmentType: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      competencies: ['', Validators.required], // New control for competencies
      goals: ['', Validators.required], // New control for goals
    });
  
    // Initialize the edit user form
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      departmentType: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      competencies: ['', Validators.required], // Same fields as add form, modify as needed
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
      // Map additional fields like competencies and goals as necessarys
    });
    this.isEditFormVisible = true;
  }

  cancelEdit() {
    this.isEditFormVisible = false;
    this.editUserForm.reset();
    this.editRecordId = null;
  }

  
  onEditSubmit() {
    if (this.editUserForm.valid) {
      const updatedRecord = this.editUserForm.value;
      console.log('Edit Form is Valid:', updatedRecord);
  
      // Example backend submission
      this.http
        .put<any>(`https://localhost:7012/performance-reviews/${updatedRecord.id}`, updatedRecord)
        .subscribe({
          next: (response) => {
            console.log('Record successfully updated:', response);
            alert('Record updated successfully!');
          },
          error: (error) => {
            console.error('Error updating record:', error);
            alert('Failed to update the record.');
          },
        });
    } else {
      console.error('Edit Form Errors:', this.editUserForm.errors);
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

  private getCompetencies(): void {
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (competencyData) => {
        if (competencyData && competencyData.data) {
          this.competencies = competencyData.data;
          console.log('Competencies:', this.competencies);
        }
      },
      (error) => {
        console.error('Error fetching competencies:', error);
      }
    );
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
}
