import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


import ITodoList from "./todo.interface";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public todoListLocal = [
    // {
    //   id: '99999',
    //   title: '99999',
    //   completed: true,
    //   userId: '99999',
    //   author: '99999',
    //   creationDate: '99999'
    // },
    // {
    //   id: '888888',
    //   title: '888888',
    //   completed: false,
    //   userId: '888888',
    //   author: '888888',
    //   creationDate: '888888'
    // },
    // {
    //   id: '7777777',
    //   title: '7777777',
    //   completed: false,
    //   userId: '7777777',
    //   author: '7777777',
    //   creationDate: '7777777'
    // }
  ];
  constructor(
    private http: HttpClient
  ) {
    // this.loadTodos()
    // .subscribe(
    //   todos => {
    //     this.todoListLocal = todos;
    //     console.log("getTodos in sub::",this.todoListLocal);
    //   },
    //   error => console.log(error)
    // )
  }

  // public loadTodos() {
  //   return this.http.get<ITodoList[]>('https://jsonplaceholder.typicode.com/todos')
  //       .pipe(
  //         map(todos => todos.slice(0, 20).map(todoItem => ({...todoItem, author:'Karl', creationDate:'23040'}))),
  //         )
  // }

  public getTodos() {
    return this.todoListLocal;
  }

  public getTodo(todoId) {
    if(this.todoListLocal.length !== 0) {
      return this.todoListLocal.find(obj => obj.id == todoId);
    }
  }

  public addTodo(todoTitle) {
    this.todoListLocal.push(
      {
        id: new Date().getTime().toString(),
        title: todoTitle,
        completed: false,
        userId: '99999',
        author: '99999',
        creationDate: '99999'
      }
    )
  }

  public updateTodo(todoId, newTitle) {
    const todo = this.todoListLocal.find(obj => obj.id == todoId);
    todo.title = newTitle;
  }

  public deleteTodo(todoId) {
    const removeIndex = this.todoListLocal.map(item => item.id).indexOf(todoId);
    this.todoListLocal.splice(removeIndex, 1);
  }

}
