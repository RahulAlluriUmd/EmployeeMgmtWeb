import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import testData from '../../../test/employee_test_data.json'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private emps: Employee[] = JSON.parse(JSON.stringify(testData))

  private apiUrl = 'api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    // return this.http.get<Employee[]>(this.apiUrl);
    return of(this.emps)
  }

  getEmployeeList(empName?: string, title?:string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/Employee list/${empName}/${title}`)
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Partial<Employee>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
