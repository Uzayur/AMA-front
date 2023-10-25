import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav>
        <a routerLink="/recipes">Liste des recettes</a>
        <button mat-raised-button color="primary" routerLink="/recipe/create">Créer une recette</button>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
