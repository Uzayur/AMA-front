import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '~/app/recipe/recipe.service';
import { Recipe } from '~/app/recipe/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent {
  form: FormGroup;
  updatedRecipeData: Recipe;

  constructor(
    private dialogRef: MatDialogRef<RecipeEditComponent>, // Allow control on component
    @Inject(MAT_DIALOG_DATA) private data: Recipe, // Inject data using Angular Material constant
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) {

    // Remove reference from data object
    this.updatedRecipeData = { ...data };

    this.form = this.formBuilder.group({
      name: [this.updatedRecipeData.name, Validators.required],
      description: [this.updatedRecipeData.description, Validators.required],
      ingredients: [this.updatedRecipeData.ingredients, Validators.required],
      instructions: [this.updatedRecipeData.instructions, Validators.required]
    });
  }

  saveChanges() {
    if (this.form.valid) {
      this.updatedRecipeData.updatedAt = new Date();
      this.recipeService.updateRecipe(this.data.id, this.updatedRecipeData).subscribe(() => {
        this.dialogRef.close(this.updatedRecipeData);
      });
    }
  }

  onSave() {
    if (this.form.valid) {
      this.saveChanges();
    } else {
      this.markFormFieldsAsTouched(this.form);
    }
  }

  markFormFieldsAsTouched(form: FormGroup | FormArray) {
    Object.values(form.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
