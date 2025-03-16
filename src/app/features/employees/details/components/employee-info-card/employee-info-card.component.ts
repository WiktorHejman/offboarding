import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { Employee } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-employee-info-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatListModule],
  template: `
    <mat-card class="mb-5">
      <mat-card-header>
        <mat-card-title>{{ employee().name }}</mat-card-title>
        <mat-card-subtitle>
          <mat-chip-set>
            <mat-chip
              [color]="employee().status === 'ACTIVE' ? 'primary' : 'warn'"
              selected
            >
              {{ employee().status }}
            </mat-chip>
          </mat-chip-set>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item>
            <span matListItemTitle>Department</span>
            <span matListItemLine>{{ employee().department }}</span>
          </mat-list-item>
          <mat-list-item>
            <span matListItemTitle>Email</span>
            <span matListItemLine>{{ employee().email }}</span>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
})
export class EmployeeInfoCardComponent {
  employee = input.required<Employee>();
}
