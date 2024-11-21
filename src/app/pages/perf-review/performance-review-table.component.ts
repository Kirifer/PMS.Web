import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
// import { AddRecordDialogComponent } from '../../components/add-record-dialog/add-record-dialog.component';

interface PerformanceRecord {
  id: string;
  departmentType: string;
  startYear: number;
  endYear: number;
  startDate: string;
  endDate: string;
  name: string;
  supervisorId: string;
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
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  http = inject(HttpClient);
  addUserForm: FormGroup; // FormGroup for adding a user
  isAddFormVisible = false; // Flag to toggle Add User form
  competencies: any[] = []; // Add this property to hold competencies

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      departmentType: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      competencies: ['', Validators.required], // New control for competencies
      goals: ['', Validators.required], // New control for goals
    });
  }

  performanceReviews$ = this.getPerformanceReviews();

  private getPerformanceReviews(): Observable<any> {
    return this.http.get<any>('https://localhost:7012/performance-reviews');
  }

  ngOnInit() {
    // Fetch performance reviews
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

    // Fetch competencies
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

  onSubmit() {
    if (this.addUserForm.valid) {
      const newRecord = this.addUserForm.value;
      console.log('Form Validity:', this.addUserForm.valid); // Check if the form is valid
      console.log('Form Control Status:', this.addUserForm.controls); // Check each control's status
      // Construct competencies and goals
      const competencies = [
        {
          competencyId: newRecord.competencies, // Competency ID
          orderNo: 1,
          weight: 5,
        },
      ];

      const goals = [
        {
          orderNo: 1,
          goals: newRecord.goals, // Goal details from form
          weight: 10,
          date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
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
        startDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        endDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        employeeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Example employee ID
        supervisorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Example supervisor ID
        goals: goals,
        competencies: competencies,
      };

      console.log('Form Data being sent:', performanceData); // Log the data being sent to the backend

      // Send the data to the backend
      this.http
        .post<any>(
          'https://localhost:7012/performance-reviews',
          performanceData
        )
        .subscribe({
          next: (response) => {
            console.log('Response from server:', response);
            this.performanceReviews.push(response); // Add the new record to the table
            this.allPerformanceReviews.push(response); // Add to the all records list
            this.isAddFormVisible = false;
            this.addUserForm.reset(); // Reset the form after submission
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
            // Remove the record from the local array
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
    // The HTTP call should return an observable
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (competencyData) => {
        if (competencyData && competencyData.data) {
          this.competencies = competencyData.data; // Store the competencies data
          console.log('Competencies:', this.competencies); // Log competencies data
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
