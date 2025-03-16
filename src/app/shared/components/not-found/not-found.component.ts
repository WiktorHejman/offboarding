import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-[60vh]">
      <mat-card class="p-8 max-w-md text-center">
        <mat-icon class="text-gray-400 text-7xl mb-4">search_off</mat-icon>
        <h1 class="text-2xl font-bold mb-2">{{ title() }}</h1>
        <p class="text-gray-600 mb-6">{{ message() }}</p>

        <div class="flex justify-center">
          <a [routerLink]="returnUrl()" mat-raised-button color="primary">
            <mat-icon>arrow_back</mat-icon>
            {{ buttonText() }}
          </a>
        </div>
      </mat-card>
    </div>
  `,
})
export class NotFoundComponent {
  title = input<string>('Page Not Found');
  message = input<string>(
    'The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
  );
  buttonText = input<string>('Return to Home');
  returnUrl = input<string>('/');
}
