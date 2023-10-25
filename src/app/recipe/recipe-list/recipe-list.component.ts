import { Component, OnInit } from '@angular/core';
import { RecipeService } from '~/app/recipe/recipe.service';
import { Recipe } from '~/app/recipe/recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '~/app/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  confirmDelete(recipe: Recipe) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { recipeName: recipe.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.deleteRecipe(recipe.id).subscribe(() => {
          this.recipes = this.recipes.filter(item => item.id !== recipe.id);
        });
      }
    });
  }
}
