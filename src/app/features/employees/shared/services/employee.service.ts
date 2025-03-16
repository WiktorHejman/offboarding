import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiService = inject(ApiService);

  private employeesSignal = signal<Employee[]>([]);
  private loadingSignal = signal<boolean>(false);
  private searchTermSignal = signal<string>('');

  readonly filteredEmployees = computed(() => {
    const searchTerm = this.searchTermSignal().toLowerCase();
    const employees = this.employeesSignal();

    if (!searchTerm) {
      return employees;
    }

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm)
    );
  });

  readonly employees = this.employeesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly searchTerm = this.searchTermSignal.asReadonly();

  loadEmployees() {
    this.loadingSignal.set(true);

    this.apiService
      .getEmployees()
      .pipe(
        tap((employees) => this.employeesSignal.set(employees)),
        catchError((error) => {
          console.error('Error loading employees:', error);
          return EMPTY;
        }),
        finalize(() => this.loadingSignal.set(false))
      )
      .subscribe();
  }

  getEmployeeById(id: string) {
    this.loadingSignal.set(true);

    return this.apiService
      .getEmployeeById(id)
      .pipe(finalize(() => this.loadingSignal.set(false)));
  }

  updateEmployeeInState(updatedEmployee: Employee) {
    const currentEmployees = this.employeesSignal();
    const updatedEmployees = currentEmployees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );

    this.employeesSignal.set(updatedEmployees);
  }

  updateSearchTerm(term: string) {
    this.searchTermSignal.set(term);
  }
}
