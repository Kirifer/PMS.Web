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
import { Employee } from '../models/class/employee';
import { ResponseModel } from '../models/entities/response';


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
export class PerformRevComponent implements OnInit {

  


  constructor(private _dialog: MatDialog, private reviewService: PerformanceReviewService) {}

  displayedColumns: string[] = ['id', 'departmentType', 'reviewYear', 'startDate', 'endDate', 'name', 'supervisor', 'actions'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  employeeList: Employee[] = [];

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.reviewService.getAllEmployees().subscribe(
      (res:ResponseModel) => {
        this.employeeList = res.data;
        this.dataSource.data = this.employeeList;
      }, error=> {
        alert("API error")
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

  openDialog(): void {
    const dialogRef = this._dialog.open(AddPerformRevComponent, {
      width: '1250px',
      maxWidth: 'none',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployee();
      }
    });
  }
}