import { Recipe } from '~/app/recipe/recipe.model';

export function getMaximumId(recipes: Recipe[]): number {
  return recipes.reduce((max, recipe) => (recipe.id > max ? recipe.id : max), 0) + 1;
}
