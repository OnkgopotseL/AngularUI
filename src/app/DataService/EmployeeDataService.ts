import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/Models/Employee'
import { ROOT_URL } from 'src/Models/Config'
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeDataService {
  // Field Properties
  employees: Observable<Employee[]>;
  newemployee: Employee;
  private apiUrl: string;

  // Constructor
  constructor(private http: HttpClient) {
    this.apiUrl = ROOT_URL + "/api/";
  }

  // getEmployees method function
  getEmployee() {
    return this.http.get<Employee[]>(this.apiUrl + 'Employees');
  }

  // AddEmployee method function
  AddEmployee(emp: Employee) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      Fname: emp.firstname, Lname: emp.lastname, Email: emp.email, gender: emp.gender
    }
    console.log(this.apiUrl);

    return this.http.post<Employee>(this.apiUrl + '/Employees', body, { headers });
  }

  // EditEmployee method function
  EditEmployee(emp: Employee) {
    console.log(emp);
    const params = new HttpParams().set('ID', emp.id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      ID: emp.id, Fname: emp.firstname, Lname: emp.lastname, Email: emp.email, gender: emp.gender
    }
    return this.http.put<Employee>(this.apiUrl + 'Employees/' + emp.id, body, { headers, params })
  }

  // DeleteEmployee method function
  DeleteEmployee(emp: Employee) {
    const params = new HttpParams().set('ID', emp.id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      ID: emp.id, Fname: emp.firstname, Lname: emp.lastname, Email: emp.email, gender: emp.gender
    }
    return this.http.delete<Employee>(this.apiUrl + '/Employees/' + emp.id)
  }
}
