import { Injectable } from '@angular/core';
import {Category} from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {
  //placeholder for last id so we can fake auto-increment
  lastId = 0;

  //placholder for categories
  categories: Category[] = [];

  constructor() { }

  //simulated POST /categories
  addCategory(category: Category): CategoryDataService {
    if (!category.id) {
      category.id = ++this.lastId;
    }
    this.categories.push(category);
    return this;
  }

  //simulated DELETE /categories/:id
  deleteCategoryById(id: number): CategoryDataService {
    this.categories = this.categories
      .filter(category => category.id !== id);
    return this;
  }

  //simulated PUT /categories/:id
  updateCategoryById(id: number, values: Object = {}): Category | any {
    let category = this.getCategoryById(id);
    if (!category) {
      return null;
    }
    Object.assign(category, values);
    return category;
  }

  //simulated GET /categories
  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: number): Category | any {
    return this.categories
      .filter(category => category.id === id)
      .pop();
  }
}
