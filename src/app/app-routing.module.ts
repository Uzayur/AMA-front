import { RecipeDetailComponent } from '~/app/recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from '~/app/recipe/recipe-list/recipe-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // Redirige vers la liste des recettes
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
];


