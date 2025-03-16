import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  show(
    message: string,
    type: NotificationType = 'info',
    duration: number = 5000
  ): void {
    const panelClass = this.getPanelClassForType(type);

    this.snackBar.open(message, 'Close', {
      duration,
      panelClass,
    });
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  private getPanelClassForType(type: NotificationType): string[] {
    switch (type) {
      case 'success':
        return ['bg-green-500', 'text-white'];
      case 'error':
        return ['bg-red-500', 'text-white'];
      case 'warning':
        return ['bg-yellow-500', 'text-white'];
      case 'info':
      default:
        return ['bg-blue-500', 'text-white'];
    }
  }
}
