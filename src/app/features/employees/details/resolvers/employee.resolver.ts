import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeService } from '../../shared/services/employee.service';

export const employeeResolver: ResolveFn<Employee | null> = (route) => {
  const employeeService = inject(EmployeeService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/employees']);
    return of(null);
  }

  return employeeService.getEmployeeById(id).pipe(
    map((employee) => {
      if (!employee) {
        return null;
      }
      return employee;
    }),
    catchError((error) => {
      console.error('Error loading employee:', error);
      return of(null);
    })
  );
};
