export interface Equipment {
  id: string;
  name: string;
}

export type EmployeeStatus = 'ACTIVE' | 'OFFBOARDED';

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: EmployeeStatus;
  email: string;
  equipments: Equipment[];
}

export interface Address {
  streetLine1: string;
  country: string;
  postalCode: string;
  receiver: string;
}

export interface OffboardingRequest {
  address: Address;
  notes?: string;
  phone: string;
  email: string;
}
