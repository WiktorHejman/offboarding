import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';

import {
  EMPLOYEE_TABLE_COLUMNS,
  EmployeeColumn,
} from '../shared/constants/table-columns';
import { Employee } from '../shared/models/employee.model';
import { EmployeeService } from '../shared/services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  template: `
    <div class="p-5 max-w-7xl mx-auto">
      <mat-card>
        <mat-card-content>
          <mat-form-field appearance="outline" class="w-full mb-4">
            <mat-label>Search employees</mat-label>
            <input
              matInput
              placeholder="Search by name or department"
              [ngModel]="searchInputValue()"
              (ngModelChange)="searchInput$.next($event)"
            />
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          @if (isLoading()) {
          <div class="flex justify-center py-10">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
          } @else { @if (hasNoResults()) {
          <div class="text-center py-5 text-gray-600">
            <p>No employees found matching your search criteria.</p>
          </div>
          } @else {
          <table mat-table [dataSource]="employees()" class="w-full">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let employee">{{ employee.name }}</td>
            </ng-container>

            <ng-container matColumnDef="department">
              <th mat-header-cell *matHeaderCellDef>Department</th>
              <td mat-cell *matCellDef="let employee">
                {{ employee.department }}
              </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let employee">{{ employee.email }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let employee">
                <mat-chip-set>
                  <mat-chip
                    [color]="employee.status === 'ACTIVE' ? 'primary' : 'warn'"
                    selected
                  >
                    {{ employee.status }}
                  </mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let employee">
                <button
                  mat-icon-button
                  color="primary"
                  (click)="viewEmployee(employee)"
                  matTooltip="View Details"
                >
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              [class]="row.status === 'OFFBOARDED' ? 'bg-red-50' : ''"
            ></tr>
          </table>
          } }
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class EmployeeDashboardComponent {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  constructor() {
    this.employeeService.loadEmployees();

    this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((term) => this.searchInputValue.set(term)),
        takeUntilDestroyed()
      )
      .subscribe();

    effect(() => {
      this.employeeService.updateSearchTerm(this.searchInputValue());
    });
  }

  readonly searchInputValue = signal('');
  readonly hasNoResults = computed(() => this.employees().length === 0);
  readonly isLoading = this.employeeService.loading;
  readonly employees = this.employeeService.filteredEmployees;
  readonly searchInput$ = new Subject<string>();

  readonly displayedColumns: readonly EmployeeColumn[] = EMPLOYEE_TABLE_COLUMNS;

  viewEmployee(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }
}
