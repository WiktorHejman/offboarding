import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div
      class="flex flex-col items-center justify-center py-8"
      [class.py-16]="fullPage()"
    >
      <mat-spinner [diameter]="diameter()"></mat-spinner>
      @if (message()) {
      <p class="mt-4 text-gray-600">{{ message() }}</p>
      }
    </div>
  `,
})
export class LoadingComponent {
  diameter = input<number>(40);
  message = input<string>('');
  fullPage = input<boolean>(false);
}
