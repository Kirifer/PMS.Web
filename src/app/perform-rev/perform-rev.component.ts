import { Component, OnInit, inject, AfterViewInit, ViewChild } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AddPerformRevComponent } from '../add-perform-rev/add-perform-rev.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';

import employees from "./data.json"
import { PerformanceReviewService } from '../services/performanceReview/performance-review.service';
import { IUserData } from '../models/entities/userData';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-perform-rev',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule
  ],
  templateUrl: './perform-rev.component.html',
  styleUrl: './perform-rev.component.css',
})
export class PerformRevComponent implements AfterViewInit {

  constructor(private _dialog: MatDialog, private reviewService: PerformanceReviewService) {}

 
  displayedColumns: string[] = ['id', 'department', 'reviewYear', 'startDate', 'endDate', 'employee', 'supervisor', 'actions'];
  dataSource = new MatTableDataSource<IUserData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPerformanceReviews() {
    this.reviewService.getPerformanceReviews().subscribe(
      (reviews) => {
        this.dataSource.data = reviews;
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
      }
    );
  }
 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this._dialog.open(AddPerformRevComponent, {
      width: '1250px',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the reviews list after a new review is added
        this.getPerformanceReviews();
      }
    });
  }

  deleteReview(id: number) {
    this.reviewService.deletePerformanceReview(id).subscribe(
      () => {
        this.getPerformanceReviews(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting review:', error);
      }
    );
  }

}