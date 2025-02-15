import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { EmployeeComponent } from "./features/employee/employee.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Employee Management';
}
