import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee, TitleList } from '../../models/employee.model';
import testData from '../../../test/employee_test_data.json';
import titleListData from '../../../test/title_list_test_data.json';
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly environment = environment
  private emps: Employee[] = JSON.parse(JSON.stringify(testData))
  private titleList: TitleList[] = JSON.parse(JSON.stringify(titleListData))

  private apiUrl = this.environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
    // return of(this.emps);
  }

  getTitleList(): Observable<TitleList[]> {
    return this.http.get<TitleList[]>(`${this.apiUrl}/Title list`)
    // return of(this.titleList);
  }

  getEmployeeList(empName?: string, title?:string): Observable<Employee[]> {
    let params = new HttpParams()
    .set('name', empName ?? '')
    .set('title', title ?? '')
    return this.http.get<Employee[]>(`${this.apiUrl}/Employee list`, {params})
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Employee>(`${this.apiUrl}/Add Employee`, employee, {headers});
  }

  updateEmployee(id: number, employee: Partial<Employee>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
