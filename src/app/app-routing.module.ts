import { RecipeDetailComponent } from '~/app/recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from '~/app/recipe/recipe-list/recipe-list.component';
import { Routes } from '@angular/router';
import { RecipeCreateComponent } from '~/app/recipe/recipe-create/recipe-create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // Redirect to recipe list
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe/create', component: RecipeCreateComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
];


