import {
  Employee,
  EmployeeStatus,
} from '../../../features/employees/shared/models/employee.model';

export const mockEmployeeData: Employee[] = [
  {
    id: 'vvv1323',
    name: 'John Doe',
    department: 'Engineering',
    status: 'ACTIVE' as EmployeeStatus,
    email: 'john.doe@company.com',
    equipments: [
      {
        id: 'aaa123456',
        name: 'Macbook Air',
      },
      {
        id: 'bbb789012',
        name: 'Magic Mouse',
      },
    ],
  },
  {
    id: 'vvv1324',
    name: 'Jane Smith',
    department: 'Marketing',
    status: 'ACTIVE' as EmployeeStatus,
    email: 'jane.smith@company.com',
    equipments: [
      {
        id: 'ccc345678',
        name: 'Dell XPS',
      },
      {
        id: 'ddd901234',
        name: 'Wireless Keyboard',
      },
    ],
  },
  {
    id: 'vvv1325',
    name: 'Michael Johnson',
    department: 'HR',
    status: 'ACTIVE' as EmployeeStatus,
    email: 'michael.johnson@company.com',
    equipments: [
      {
        id: 'eee567890',
        name: 'Lenovo ThinkPad',
      },
    ],
  },
];
