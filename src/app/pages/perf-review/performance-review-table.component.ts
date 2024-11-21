import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  imports: [NgFor, LucideAngularModule, HttpClientModule],
  template: `
    <div class="flex justify-between items-center mb-6">
      <input
        matInput
        (keyup)="applyFilter($event)"
        placeholder="Search records"
        #input
        class="px-4 py-2 border rounded-lg shadow-sm flex-grow mr-4"
      />
      <!-- Add Record Button -->
      <button
        class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Record
      </button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              *ngFor="let header of headers"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let record of performanceReviews">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.departmentType }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.startYear }} - {{ record.endYear }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.startDate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.endDate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ record.supervisorId }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-indigo-600 hover:text-indigo-900 mr-3">
                <i-lucide [img]="Edit" class="w-5 h-5"></i-lucide>
              </button>
              <button
                class="text-red-600 hover:text-red-900"
                (click)="deleteRecord(record.id)"
              >
                <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class PerformanceReviewTableComponent implements OnInit {
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  http = inject(HttpClient);

  performanceReviews$ = this.getPerformanceReviews();

  private getPerformanceReviews(): Observable<any> {
    return this.http.get<any>('https://localhost:7012/performance-reviews');
  }

  ngOnInit() {
    this.performanceReviews$.subscribe((data: any) => {
      if (data && data.data) {
        this.performanceReviews = data.data;
        this.allPerformanceReviews = [...this.performanceReviews];
        console.log(data.data);
      }
    });
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

  constructor(private dialog: MatDialog) {}

  // addRecord() {
  //   const dialogRef = this.dialog.open(AddRecordDialogComponent, {
  //     width: '600px',
  //     height: 'auto',
  //     disableClose: false, // Optional: Allows closing the dialog by clicking outside
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       // Handle the submitted data (POST request)
  //       console.log('Dialog result:', result);
  //     }
  //   });
  // }

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
