import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="header">
      <a routerLink="/recipes">
        <button mat-icon-button>
          <mat-icon class="home-icon">home</mat-icon>
        </button>
      </a>
      <div class="flex-spacer"></div>
      <a routerLink="/recipe/create">
        <button mat-raised-button class="create-button">Créer une recette</button>
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .flex-spacer {
      flex: 1;
    }

    .home-icon {
      color: white;
    }

    .create-button {
      margin-right: 10px;
      color: white;
      font-size: 15px
    }
  `]
})
export class AppComponent {
}
