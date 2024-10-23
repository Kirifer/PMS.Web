import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddReviewComponent } from '../add-review/add-review.component';
import { MatDialog } from '@angular/material/dialog';

import employees from "../perform-rev/data.json"
import { IUserData } from '../models/entities/userData';





@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule]
})
export class DashboardComponent implements AfterViewInit {
  constructor(private _dialog: MatDialog) {}

  displayedColumns: string[] = ['name', 'reviewYear', 'startDate', 'endDate', 'employee', 'supervisor', 'actions'];
  dataSource = new MatTableDataSource<IUserData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // OPEN DIALOG
  openAddReview(){
    this._dialog.open(AddReviewComponent,{
      width: '1300px',
      maxWidth: 'none',
      height: '800px',
      maxHeight: 'none',
      autoFocus: false,
      
    });
  }
}