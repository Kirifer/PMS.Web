import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import employees from "./data.json"
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AddPerformRevComponent } from '../add-perform-rev/add-perform-rev.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';




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


  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddPerformRevComponent, {
      width: '1100px',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
 

  

  

}








