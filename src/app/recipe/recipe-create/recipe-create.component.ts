import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '~/app/recipe/recipe.service';
import { getMaximumId } from '../../../../utils/get-maximum-id';
import { Recipe } from '~/app/recipe/recipe.model';
import { StringToStringArray } from '../../../../utils/string-to-string-array';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
  form: FormGroup;
  recipeID: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });

    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipeID = getMaximumId(recipes);
    })
  }

  saveRecipe() {
    if (this.form.valid) {
      const newRecipeData = {
        ...this.form.value,
        id: this.recipeID,
        ingredients: StringToStringArray(this.form.value.ingredients),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.recipeService.createRecipe(newRecipeData).subscribe({
        next: () => {
          void this.router.navigate(['/recipes']);
        },
        error: (error) => {
          console.error('Creation recipe error', error)
        }
      });
    }
  }
}
