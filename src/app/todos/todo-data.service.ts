import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  //placeholder for last id so we can fake auto-increment.
  lastId = 0;

  //todo placeholder
  todos: Todo[] = [];

  constructor() { }

  //simulated POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  //simulated DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  //simulated PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo | any {
    const todo = this.getTodoById(id);
    if (!todo) {
      return this;
    }
    Object.assign(todo, values);
    return todo;
  }

  //simulated GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  //simulated GET /todos/:id
  getTodoById(id: number): Todo | any {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  //simulated GET /todos/:category
  getTodoByCategory(id: number): Todo[] {
    return this.todos
      .filter(todo => todo.category === id);
  }

  //toggle complete
  toggleComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
