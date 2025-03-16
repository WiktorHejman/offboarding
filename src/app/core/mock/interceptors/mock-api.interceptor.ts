import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Employee,
  EmployeeStatus,
} from '../../../features/employees/shared/models/employee.model';
import { mockEmployeeData } from '../data/mock-employee-data';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  if (req.url.endsWith('/employees') && req.method === 'GET') {
    return of(
      new HttpResponse({
        status: 200,
        body: mockEmployeeData,
      })
    ).pipe(delay(environment.mockDelay));
  }

  if (req.url.match(/\/employees\/[^\/]+$/) && req.method === 'GET') {
    const id = req.url.split('/').pop();
    const employee = mockEmployeeData.find((emp: Employee) => emp.id === id);

    return of(
      new HttpResponse({
        status: employee ? 200 : 404,
        body: employee || null,
      })
    ).pipe(delay(environment.mockDelay));
  }

  if (
    req.url.match(/\/employees\/[^\/]+\/offboard$/) &&
    req.method === 'POST'
  ) {
    const id = req.url.split('/')[req.url.split('/').length - 2];
    const employee = mockEmployeeData.find((emp: Employee) => emp.id === id);

    if (employee) {
      const updatedEmployee: Employee = {
        ...employee,
        status: 'OFFBOARDED' as EmployeeStatus,
      };

      const index = mockEmployeeData.findIndex(
        (emp: Employee) => emp.id === id
      );
      if (index !== -1) {
        mockEmployeeData[index] = updatedEmployee;
      }

      return of(
        new HttpResponse({
          status: 200,
          body: updatedEmployee,
        })
      ).pipe(delay(environment.mockDelay));
    }

    return of(
      new HttpResponse({
        status: 404,
        body: { error: 'Employee not found' },
      })
    ).pipe(delay(environment.mockDelay));
  }

  return next(req);
};
