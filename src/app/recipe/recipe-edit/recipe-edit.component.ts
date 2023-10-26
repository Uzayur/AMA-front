import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '~/app/recipe/recipe.service';
import { Recipe } from '~/app/recipe/recipe.model';
import { ToastrService } from '~/app/toaster/toastr.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RecipeEditComponent>, // Allow control on component
    @Inject(MAT_DIALOG_DATA) private data: Recipe, // Inject data using Angular Material constant
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      ingredients: [this.data.ingredients, Validators.required],
      instructions: [this.data.instructions, Validators.required]
    });
  }

  saveChanges() {
    if (this.form.valid) {
      const updatedRecipeData = { ...this.data, ...this.form.value };
      updatedRecipeData.updatedAt = new Date();
      this.recipeService.updateRecipe(this.data.id, updatedRecipeData).subscribe({
        next: () => {
          this.dialogRef.close(updatedRecipeData);
          this.toastr.showSuccess('La recette a bien été modifiée', 'Succès');
        },
        error: (error) => {
          console.log('Update recipe error', error);
          this.toastr.showError('La modification de la recette a échouée', 'Erreur');
        }
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

  markFormFieldsAsTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      if (control instanceof FormGroup) {
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
