import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-offboarding-actions',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="col-span-1 md:col-span-2 flex justify-end mt-5">
      @if (employee().status === 'ACTIVE') {
      <button
        mat-raised-button
        color="warn"
        (click)="offboard.emit()"
        [disabled]="!hasEquipment"
      >
        <mat-icon>logout</mat-icon> Offboard Employee
      </button>
      } @else {
      <p class="flex items-center gap-2 text-red-500">
        <mat-icon color="warn">info</mat-icon>
        This employee has already been offboarded.
      </p>
      }
    </div>
  `,
})
export class OffboardingActionsComponent {
  employee = input.required<Employee>();
  hasEquipment = input.required<boolean>();
  offboard = output<void>();
}
