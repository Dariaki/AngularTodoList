import { Component, OnInit } from '@angular/core';
import {TodoListService} from "../../services/todoList/todolist.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import ITodoList from "../../services/todoList/todo.interface";
import { map } from "rxjs/operators"

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todoList = [];
  form: FormGroup;

  constructor(
    private TodoListService: TodoListService,
  ) {
    this.todoList = this.TodoListService.getTodos();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  public onSubmit() {
    const {title} = this.form.value;

      this.TodoListService.addTodo(title);
      this.form.reset();

  }


}