import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './details/feature/employee-details.component';
import { employeeResolver } from './details/resolvers/employee.resolver';

export const EMPLOYEE_ROUTES: Routes = [
  { path: '', component: EmployeeDashboardComponent },
  {
    path: ':id',
    component: EmployeeDetailsComponent,
    resolve: {
      employee: employeeResolver,
    },
  },
];
