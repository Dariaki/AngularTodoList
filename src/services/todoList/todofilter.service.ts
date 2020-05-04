import { Injectable } from '@angular/core';
import ITodo from './todo.interface';
import {TodoListService} from './todolist.service';

@Injectable({
  providedIn: 'root'
})
export class TodoFilterService {

  private todosFiltered: ITodo[];
  constructor(
    private TodoListS: TodoListService
  ) { }

  public filterCompleted(): ITodo[] {
    this.todosFiltered = this.TodoListS.getTodos();
    return this.todosFiltered.filter(todo => todo.completed);
  }

  public filterUncompleted(): ITodo[] {
    this.todosFiltered = this.TodoListS.getTodos();
    return this.todosFiltered.filter(todo => !todo.completed);
  }

}
