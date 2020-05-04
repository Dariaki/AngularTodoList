import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import ITodo from './todo.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todoStream$: Subject<ITodo[]> = new Subject<ITodo[]>();
  public todoListLocal = [];
  constructor(
    private http: HttpClient
  ) {
    this.loadTodos()
    .subscribe(
      todos => {
        this.todoListLocal = todos;
        this.todoStream$.next(this.todoListLocal);
      },
      error => console.log(error)
    );
  }

  public loadTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
        .pipe(
          map(todos => todos.slice(0, 10).map(todoItem => ({...todoItem, creationDate: '23040' }))),
          );
  }

  public getTodos() {
    return this.todoListLocal;
  }

  public getTodo(todoId) {
    if (this.todoListLocal.length !== 0) {
      return this.todoListLocal.find(obj => obj.id == todoId);
    }
  }

  public addTodo(todo: ITodo): void {

    this.todoListLocal.push(todo);
    this.todoStream$.next(this.todoListLocal);

  }

  public updateTodo(todoId, newTitle): void {
    const todo = this.todoListLocal.find(obj => obj.id == todoId);
    todo.title = newTitle;
  }

  public markTodo(todoId): void {
    const todo = this.todoListLocal.find(obj => obj.id == todoId);
    todo.completed = !todo.completed;
  }

  public deleteTodo(todoId): void {
    const removeIndex = this.todoListLocal.map(item => item.id).indexOf(todoId);
    this.todoListLocal.splice(removeIndex, 1);
  }

}
