import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees.routes').then(
        (m) => m.EMPLOYEE_ROUTES
      ),
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      title: 'Page Not Found',
      message: 'The requested page does not exist.',
    },
  },
  { path: '**', redirectTo: '404' },
];
