import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TodoListService} from "../../services/todoList/todolist.service";
import ITodoList from "../../services/todoList/todo.interface";
import {FormBuilder} from "@angular/forms";
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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoListService
  ) {

  }

  ngOnInit(): void {
    // this.route.snapshot.params - sync approach instead of reactive/
    this.route.params.subscribe(p => {
      this.todoItem = this.todoService.getTodo(p.id);
      this.checkoutForm = this.formBuilder.group({
        newTitle: `${this.todoItem.title}`
      });
    })
  }

  public editTodo() {
    this.readonly = false;
  }

  public onSubmit(userData) {
    this.readonly = true;
    this.route.params.subscribe(p => {
      this.todoService.updateTodo(p.id, userData.newTitle);
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
