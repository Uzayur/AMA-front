import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '~/app/recipe/recipe.model';
import { RecipeService } from '~/app/recipe/recipe.service';
import { timestampToFormattedDate } from '~/utils/date-utils';
import { RecipeEditComponent } from '~/app/recipe/recipe-edit/recipe-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  recipeId: number| undefined;

  createdAt: string = "";
  updatedAt: string = "";

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeId = Number(params.get('id'));
      this.recipeService.getRecipeById(this.recipeId).subscribe((data: Recipe) => {
        this.recipe = data;

        // Transform timestamp in string
        this.createdAt = timestampToFormattedDate(this.recipe?.createdAt);
        this.updatedAt = timestampToFormattedDate(this.recipe?.updatedAt);
      });
    });
  }

  editRecipe() {
    const dialogRef = this.dialog.open(RecipeEditComponent, {
      data: this.recipe,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Apply modifications on edited recipe
        this.recipe = result;
        // Refresh updatedAt
        window.location.reload();
      }
    });
  }
}
