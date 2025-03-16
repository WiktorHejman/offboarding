import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <div class="flex flex-col min-h-screen">
      <mat-toolbar color="primary" class="shadow-md z-10">
        <span>Employee Offboarding System</span>
      </mat-toolbar>

      <main class="flex-1 bg-gray-100 p-5">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {}
