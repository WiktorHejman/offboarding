import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {
  EQUIPMENT_TABLE_COLUMNS,
  EquipmentColumn,
} from '../../../shared/constants/table-columns';
import { Equipment } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-equipment-table',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  template: `
    <mat-card class="mb-5">
      <mat-card-header>
        <mat-card-title>Equipment</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        @if (!equipments().length) {
        <p>No equipment assigned.</p>
        } @else {
        <table mat-table [dataSource]="equipments()" class="w-full">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let equipment">
              {{ equipment.id }}
            </td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let equipment">
              {{ equipment.name }}
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
        }
      </mat-card-content>
    </mat-card>
  `,
})
export class EquipmentTableComponent {
  equipments = input.required<Equipment[]>();
  readonly displayedColumns: readonly EquipmentColumn[] =
    EQUIPMENT_TABLE_COLUMNS;
}
