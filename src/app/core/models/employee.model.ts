export interface Employee {
    name: string;
    ssn: number;
    dob: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    phonenumber: number;
    joinDate: string;
    employeeSalaries: Salary[]
}

export interface Salary {
    fromDate: string;
    toDate: string;
    title: string;
    salary: number;
}

export interface EmployeeSalaryDto {
    name: string;
    dob: string;
    joinDate: string;
    title: string;
    salary: number;
}