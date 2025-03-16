import { Injectable, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, catchError, finalize } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { OffboardingDialogComponent } from '../../details/dialogs/offboarding-dialog/offboarding-dialog.component';
import { Employee, OffboardingRequest } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class OffboardingService {
  private dialog = inject(MatDialog);
  private apiService = inject(ApiService);

  private loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  openOffboardingDialog(
    employee: Employee
  ): Observable<OffboardingRequest | undefined> {
    return this.dialog
      .open(OffboardingDialogComponent, {
        width: '600px',
        data: { employee },
      })
      .afterClosed();
  }

  processOffboarding(
    employeeId: string,
    request: OffboardingRequest
  ): Observable<Employee> {
    this.loadingSignal.set(true);

    return this.apiService.offboardEmployee(employeeId, request).pipe(
      catchError((error) => {
        console.error('Error during offboarding:', error);
        return EMPTY;
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }
}
