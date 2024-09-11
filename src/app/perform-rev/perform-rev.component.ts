import { Component, OnInit } from '@angular/core';
import employees from "./data.json"
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AddPerformRevComponent } from '../add-perform-rev/add-perform-rev.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-perform-rev',
  templateUrl: './perform-rev.component.html',
  styleUrl: './perform-rev.component.css',
})


export class PerformRevComponent implements OnInit {
  // Define the columns to be displayed in the table
  displayedColumns: string[] = [
    'id',
    'name',
    'reviewYear',
    'startDate',
    'endDate',
    'employee',
    'supervisor',
    'action'
  ];

  constructor (private _dialog: MatDialog) {}

  // Initialize the data source
  dataSource!: MatTableDataSource<any>;
  
  data = employees;
  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  
  ngOnInit() {
    // Optionally add a 'position' field for numbering the rows
    const dataWithPosition = this.data.map((item, index) => ({
      position: index + 1,
      ...item,
    }));
    // Initialize the data source with the modified data
    this.dataSource = new MatTableDataSource(dataWithPosition);
  }


  
 

  openAddEditForm() {
    const dialogRef = this._dialog.open(AddPerformRevComponent, {
      // width: '500px',  // You can adjust the dialog size if necessary
      panelClass: 'custom-dialog-container',
      data: {}         // Pass any necessary data to the component (if needed)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed (e.g., refresh the table)
        console.log("Dialog closed with result:", result);
      }
    });
  }

  
  
  
  











  
  

}








