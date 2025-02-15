import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { Employee, EmployeeSalaryDto } from '../../core/models/employee.model';
import { EmployeeService } from '../../core/services/employeeService/employee.service';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { Title } from '@angular/platform-browser';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogData } from '../../core/models/dialogData';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatMenuModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['name', 'dob', 'joinDate', 'currentTitle', 'currentSalary', 'actions'];
  dataSource = new MatTableDataSource<EmployeeSalaryDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.dataSource.data = data.map(e => ({name: e.name,
           dob: new Date(e.dob).toLocaleDateString(),
           joinDate: new Date(e.joinDate).toLocaleDateString(),
           title:e.employeeSalaries[0].title,
           salary:e.employeeSalaries.sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())[0].salary}
          ) as EmployeeSalaryDto);
      },
      error => {
        this.snackBar.open('Error loading employees', 'Close', { duration: 3000 });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeService.getEmployeeList(filterValue, filterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.dataSource.data = data.map(e => ({name: e.name,
            dob: new Date(e.dob).toLocaleDateString(),
            joinDate: new Date(e.joinDate).toLocaleDateString(),
            title:e.employeeSalaries[0].title,
            salary:e.employeeSalaries.sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())[0].salary}
           ) as EmployeeSalaryDto);
        }
        else
          this.openNoResultDialog()      
      },
      error => {
        console.log(error)
        this.snackBar.open('Error loading employees', 'Close', { duration: 3000 });
      }
    )

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddemployeeComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  openNoResultDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: new DialogData('Warning', 'No results found. \n Please refine your result', 'OK', 'warning_outline')
    })
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data:this.noImplementationDialogData()
    })
  }

  noImplementationDialogData(): DialogData{
    return new DialogData('Information', 'Feature not yet Implemented', 'OK', "info_outline");
  }

  deleteEmployee(data: EmployeeSalaryDto) {
    this.openInfoDialog();
  }
  editEmployee(data: EmployeeSalaryDto) {
    this.openInfoDialog();
  }
  viewDetails(data: EmployeeSalaryDto) {
    this.openInfoDialog();
  }
}
