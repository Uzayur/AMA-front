import { Component, OnInit } from '@angular/core';
import { RecipeService } from '~/app/recipe/recipe.service';
import { Recipe } from '~/app/recipe/recipe.model';
import { ConfirmDeleteDialogComponent } from '~/app/confirm-delete-dialog/confirm-delete-dialog.component';
import { ToastrService } from '~/app/toaster/toastr.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
        this.toastr.showError('Erreur lors du chargement des données', 'Erreur');
      }
    });
  }

  confirmDelete(recipe: Recipe) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { recipeName: recipe.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.deleteRecipe(recipe.id).subscribe({
          next: () => {
            this.recipes = this.recipes.filter(item => item.id !== recipe.id);
            this.toastr.showSuccess('La recette a bien été supprimée', 'Succès');
          },
          error: (error) => {
            console.log('Delete recipe error', error)
            this.toastr.showError('La suppression a échoué', 'Erreur');
          }
        });
      }
    });
  }
}
