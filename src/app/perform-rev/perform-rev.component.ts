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
import { IUserData } from '../models/userData';
import { HttpClientModule } from '@angular/common/http';





const ELEMENT_DATA: IUserData[] = employees;



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

  constructor(private _dialog: MatDialog) {}

 
  displayedColumns: string[] = ['id', 'name', 'reviewYear', 'startDate', 'endDate', 'employee', 'supervisor', 'actions'];
  dataSource: MatTableDataSource<IUserData> = new MatTableDataSource(ELEMENT_DATA);

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


  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddPerformRevComponent, {
      width: '1250px',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}