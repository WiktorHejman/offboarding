import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, filter, switchMap, take, tap } from 'rxjs';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import {
  Employee,
  OffboardingRequest,
} from '../../shared/models/employee.model';
import { EmployeeService } from '../../shared/services/employee.service';
import { OffboardingService } from '../../shared/services/offboarding.service';
import { EmployeeInfoCardComponent } from '../components/employee-info-card/employee-info-card.component';
import { EquipmentTableComponent } from '../components/equipment-table/equipment-table.component';
import { OffboardingActionsComponent } from '../components/offboarding-actions/offboarding-actions.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LoadingComponent,
    EmployeeInfoCardComponent,
    EquipmentTableComponent,
    OffboardingActionsComponent,
  ],
  template: `
    <div class="p-5 max-w-7xl mx-auto">
      <button mat-raised-button color="primary" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon> Back to Dashboard
      </button>

      @if (isLoading()) {
      <app-loading message="Processing request..."></app-loading>
      } @if (!employee()) {
      <mat-card class="mt-5 text-center">
        <mat-card-content>
          <p>Employee not found.</p>
        </mat-card-content>
      </mat-card>
      } @else {
      <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <app-employee-info-card
          [employee]="employee()!"
        ></app-employee-info-card>

        <app-equipment-table
          [equipments]="employee()!.equipments"
        ></app-equipment-table>

        <app-offboarding-actions
          class="col-span-2"
          [employee]="employee()!"
          [hasEquipment]="hasEquipment()"
          (offboard)="openOffboardDialog()"
        ></app-offboarding-actions>
      </div>
      }
    </div>
  `,
})
export class EmployeeDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private offboardingService = inject(OffboardingService);
  private notificationService = inject(NotificationService);

  employee = signal<Employee | null>(null);

  readonly hasEquipment = computed(
    () => !!this.employee() && this.employee()!.equipments.length > 0
  );

  readonly isActive = computed(
    () => !!this.employee() && this.employee()!.status === 'ACTIVE'
  );

  readonly isLoading = computed(
    () => this.employeeService.loading() || this.offboardingService.loading()
  );

  ngOnInit(): void {
    const employeeData = this.route.snapshot.data['employee'];
    this.employee.set(employeeData);
  }

  openOffboardDialog(): void {
    if (!this.employee()) return;

    this.offboardingService
      .openOffboardingDialog(this.employee()!)
      .pipe(
        take(1),
        filter((result) => !!result),
        switchMap((result) => this.processOffboarding(result))
      )
      .subscribe();
  }

  processOffboarding(request: OffboardingRequest) {
    if (!this.employee()) return EMPTY;

    return this.offboardingService
      .processOffboarding(this.employee()!.id, request)
      .pipe(
        tap((updatedEmployee) => {
          this.employee.set(updatedEmployee);
          this.employeeService.updateEmployeeInState(updatedEmployee);
          this.notificationService.success('Employee offboarded successfully');
        }),
        catchError((error) => {
          console.error('Error offboarding employee:', error);
          this.notificationService.error('Error offboarding employee');
          return EMPTY;
        })
      );
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
