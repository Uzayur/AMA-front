import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav>
        <a routerLink="/recipes">Liste des recettes</a>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    `
  ]
})
export class AppComponent {
}
