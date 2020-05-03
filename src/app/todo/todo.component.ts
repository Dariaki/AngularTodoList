import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TodoListService} from "../../services/todoList/todolist.service";
import ITodoList from "../../services/todoList/todo.interface";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public todoItem: ITodoList;
  public readonly = true;
  public checkoutForm: any;
  editTodoForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoListService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.todoItem = this.todoService.getTodo(p.id);
      this.editTodoForm = new FormGroup({
        newTitle: new FormControl(`${this.todoItem.title}`, Validators.required)
      });

    })
  }

  public editTodo() {
    this.readonly = false;
  }

  public onSubmit() {
    const {newTitle} = this.editTodoForm.value;

    this.readonly = true;
    this.route.params.subscribe(p => {
      this.todoService.updateTodo(p.id, newTitle);
    })
    this.router.navigate(['/todos']);

  }

  public deleteTodo() {
    this.route.params.subscribe(p => {
      this.todoService.deleteTodo(p.id);
    })
    this.router.navigate(['/todos']);
  }

}
