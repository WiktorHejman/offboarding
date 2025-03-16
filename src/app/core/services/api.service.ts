import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Employee,
  OffboardingRequest,
} from '../../features/employees/shared/models/employee.model';

/**
 * API Service that makes real HTTP requests with mock interceptor
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all employees
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  /**
   * Get a single employee by ID
   */
  getEmployeeById(id: string): Observable<Employee | undefined> {
    return this.http.get<Employee | undefined>(
      `${this.apiUrl}/employees/${id}`
    );
  }

  /**
   * Offboard an employee
   */
  offboardEmployee(
    id: string,
    request: OffboardingRequest
  ): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.apiUrl}/employees/${id}/offboard`,
      request
    );
  }
}
