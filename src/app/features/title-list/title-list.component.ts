import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employeeService/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TitleList } from '../../core/models/employee.model';

@Component({
  selector: 'app-title-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule,
    ScrollingModule
  ],
  templateUrl: './title-list.component.html',
  styleUrl: './title-list.component.scss'
})
export class TitleListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['title', 'minSalary', 'maxSalary']
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<TitleListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TitleList[],
  ) {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    if (this.data) {
      this.dataSource.data = this.data;
      console.log(this.data[0])
    }
  }

  OndialogClose() {
    this.dialogRef.close();
  }

  

  loadEmployeeList(): void {}

  
}
