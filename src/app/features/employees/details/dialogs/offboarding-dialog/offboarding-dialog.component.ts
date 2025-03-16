import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Employee,
  OffboardingRequest,
} from '../../../shared/models/employee.model';

export interface OffboardingDialogData {
  employee: Employee | null;
}

@Component({
  selector: 'app-offboarding-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  template: `
    <h2 mat-dialog-title>Offboard {{ employee()?.name }}</h2>
    <div mat-dialog-content>
      <p>Please fill in the offboarding details for equipment return:</p>

      <form [formGroup]="offboardingForm" class="flex flex-col gap-4">
        <div class="mb-4">
          <h3 class="mb-2 text-gray-700 font-medium">Shipping Address</h3>

          <div formGroupName="address">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Receiver Name</mat-label>
              <input
                matInput
                formControlName="receiver"
                placeholder="Full name of receiver"
              />
              @if (addressForm.get('receiver')?.invalid &&
              addressForm.get('receiver')?.touched) {
              <mat-error>Receiver name is required</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Street Address</mat-label>
              <input
                matInput
                formControlName="streetLine1"
                placeholder="Street address"
              />
              @if (addressForm.get('streetLine1')?.invalid &&
              addressForm.get('streetLine1')?.touched) {
              <mat-error>Street address is required</mat-error>
              }
            </mat-form-field>

            <div class="flex gap-4">
              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>Country</mat-label>
                <input
                  matInput
                  formControlName="country"
                  placeholder="Country"
                />
                @if (addressForm.get('country')?.invalid &&
                addressForm.get('country')?.touched) {
                <mat-error>Country is required</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="flex-1">
                <mat-label>Postal Code</mat-label>
                <input
                  matInput
                  formControlName="postalCode"
                  placeholder="Postal code"
                />
                @if (addressForm.get('postalCode')?.invalid &&
                addressForm.get('postalCode')?.touched) {
                <mat-error>Postal code is required</mat-error>
                }
              </mat-form-field>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="mb-2 text-gray-700 font-medium">Contact Details</h3>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Email</mat-label>
            <input
              matInput
              formControlName="email"
              placeholder="Contact email"
              type="email"
            />
            @if (offboardingForm.get('email')?.invalid &&
            offboardingForm.get('email')?.touched) {
            <mat-error>
              @if (offboardingForm.get('email')?.errors?.['required']) { Email
              is required } @else if
              (offboardingForm.get('email')?.errors?.['email']) { Please enter a
              valid email address }
            </mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Phone</mat-label>
            <input
              matInput
              formControlName="phone"
              placeholder="Contact phone"
              type="tel"
            />
            @if (offboardingForm.get('phone')?.invalid &&
            offboardingForm.get('phone')?.touched) {
            <mat-error>Phone number is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="mb-4">
          <h3 class="mb-2 text-gray-700 font-medium">Additional Notes</h3>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Notes</mat-label>
            <textarea
              matInput
              formControlName="notes"
              placeholder="Any additional notes or instructions"
              rows="3"
            ></textarea>
          </mat-form-field>
        </div>
      </form>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button
        mat-raised-button
        color="warn"
        [disabled]="offboardingForm.invalid"
        (click)="submit()"
      >
        Confirm Offboarding
      </button>
    </div>
  `,
  styles: [
    `
      ::ng-deep .mat-mdc-dialog-surface.mdc-dialog__surface {
        overflow-x: hidden;
      }
    `,
  ],
})
export class OffboardingDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<OffboardingDialogComponent>);
  private dialogData = inject(MAT_DIALOG_DATA);

  private employeeSignal = signal<Employee | null>(null);
  readonly employee = this.employeeSignal.asReadonly();

  readonly offboardingForm = this.fb.group({
    address: this.fb.group({
      streetLine1: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      receiver: ['', Validators.required],
    }),
    notes: [''],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  get addressForm(): FormGroup {
    return this.offboardingForm.get('address') as FormGroup;
  }

  constructor() {
    if (this.dialogData?.employee) {
      this.employeeSignal.set(this.dialogData.employee);
    }
  }

  submit(): void {
    if (this.offboardingForm.valid) {
      this.dialogRef.close(this.offboardingForm.value as OffboardingRequest);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
