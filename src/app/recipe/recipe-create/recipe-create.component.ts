import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '~/app/recipe/recipe.service';
import { getMaximumId } from '../../../../utils/get-maximum-id';
import { Recipe } from '~/app/recipe/recipe.model';
import { StringToStringArray } from '../../../../utils/string-to-string-array';
import { ToastrService } from '~/app/toaster/toastr.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
})
export class RecipeCreateComponent {
  form: FormGroup;
  recipeID: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private toaster: ToastrService
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
          this.toaster.showSuccess('La recette a été créée', 'Succès')
        },
        error: (error) => {
          console.error('Creation recipe error', error)
          this.toaster.showError('La création a échoué', 'Erreur');
        }
      });
    }
  }
}
