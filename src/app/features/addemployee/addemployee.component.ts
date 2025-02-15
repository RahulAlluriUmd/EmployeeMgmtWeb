import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

import { EmployeeService } from '../../core/services/employeeService/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.scss'
})
export class AddemployeeComponent {
  employeeForm: FormGroup = new FormGroup({});
  today = new Date()
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<AddemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data?.employee) {
      this.isEdit = true;
      this.employeeForm.patchValue(this.data.employee);
    }
  }

  private createForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      ssn: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[A-Z]*$')]],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      joinDate:['', [Validators.required, ]],
      title: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  mapEmployee(employeeForm: any): Employee {
    let employee: Employee = {
      name : employeeForm.name,
      ssn : employeeForm.ssn,
      dob: new Date(employeeForm.dob).toLocaleDateString(),
      address : employeeForm.address,
      city : employeeForm.city,
      state : employeeForm.state,
      zip : employeeForm.zip,
      phonenumber : employeeForm.phone,
      joinDate : new Date(employeeForm.joinDate).toLocaleDateString(),
      employeeSalaries: [
        {
          fromDate: new Date().toLocaleDateString(),
          toDate : new Date().toLocaleDateString(),
          title : employeeForm.title,
          salary : employeeForm.salary
        }
      ]
    }
    return employee;
    // this.employee.name = employeeForm.name;
    // this.employee.ssn = employeeForm.ssn;
    // this.employee.dob = new Date(employeeForm.dob).toLocaleDateString();
    // this.employee.address = employeeForm.address;
    // this.employee.city = employeeForm.city;
    // this.employee.state = employeeForm.state;
    // this.employee.zip = employeeForm.zip;
    // this.employee.phonenumber = employeeForm.phone;
    // this.employee.joinDate = employeeForm.joinDate;
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      let employee = this.mapEmployee(this.employeeForm.value);
      console.log(employee);
      let operation = this.isEdit ?
        this.employeeService.updateEmployee(this.data.employee.id, employee) :
        this.employeeService.createEmployee(employee);
      
      (operation as Observable<Employee>).subscribe({
        next: () => {
          this.snackBar.open(
            `Employee ${this.isEdit ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open('Error occurred', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
