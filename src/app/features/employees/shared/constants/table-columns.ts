export type EmployeeColumn =
  | 'name'
  | 'department'
  | 'email'
  | 'status'
  | 'actions';

export const EMPLOYEE_TABLE_COLUMNS: readonly EmployeeColumn[] = [
  'name',
  'department',
  'email',
  'status',
  'actions',
] as const;

export type EquipmentColumn = 'id' | 'name';

export const EQUIPMENT_TABLE_COLUMNS: readonly EquipmentColumn[] = [
  'id',
  'name',
] as const;
