import { CategoryDataService } from './categories/category-data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todos/todo';
import { TodoDataService } from './todos/todo-data.service';
import { Category } from './categories/category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoDataService, CategoryDataService]
})
export class AppComponent implements OnInit {
  title = 'Todos!';
  newTodo: Todo = new Todo();
  newCategory: Category = new Category();
  selectedCategory: Category;

  constructor(private todoDataService: TodoDataService, private categoryDataService: CategoryDataService) { }

  addTodo() {
    this.newTodo.category = this.selectedCategory.id;
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    console.log(this.todos);
  }

  toggleComplete(todo: Todo) {
    this.todoDataService.toggleComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

  get todosForCat() {
    return this.todoDataService.getTodoByCategory(this.selectedCategory.id);
  }

  countTodosByCat(id: number) {
    return this.todoDataService.getTodoByCategory(id).length;
  }

  addCategory() {
    this.categoryDataService.addCategory(this.newCategory);
    this.newCategory = new Category();
  }

  removeCategory(category: Category) {
    this.categoryDataService.deleteCategoryById(category.id);
  }

  get categories() {
    return this.categoryDataService.getAllCategories();
  }

  categoryById(id: number) {
    return this.categoryDataService.getCategoryById(id);
  }

  addInitialCategory(category: Category) {
    this.categoryDataService.addCategory(category);
  }

  addInitialTodo(todo: Todo) {
    this.todoDataService.addTodo(todo);
  }

  onSelect(category: Category): void {
    this.selectedCategory = category;
  }

  ngOnInit() {
    let initCat = new Category();
    initCat = {'name' : 'Today', 'id' : 1, };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Tomorrow', 'id' : 2, };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Work', 'id' : 3, };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'School', 'id' : 4, };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Personal', 'id' : 5, };
    this.addInitialCategory(initCat);

    let initTodo = new Todo();
    initTodo = { 'title' : 'Learn Angular', 'complete' : false, 'id': 1, category: 1, }
    this.addInitialTodo(initTodo);
    initTodo = { 'title' : 'Finish Resume', 'complete' : false, 'id': 2, category: 4, }
    this.addInitialTodo(initTodo);
    initTodo = { 'title' : 'Schedule Anza', 'complete' : false, 'id': 3, category: 3, }
    this.addInitialTodo(initTodo); 
  }
}
