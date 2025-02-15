import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employeeService/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-title-list',
  standalone: true,
  imports: [],
  templateUrl: './title-list.component.html',
  styleUrl: './title-list.component.scss'
})
export class TitleListComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<TitleListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}
