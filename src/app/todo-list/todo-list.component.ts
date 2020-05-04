import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v1 as uuidv1 } from 'uuid';

import { TodoListService } from '../../services/todoList/todolist.service';
import { TodoFilterService } from '../../services/todoList/todofilter.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todoList = [];
  public searchTitleFilter = '';
  public addTodoForm: FormGroup;
  private subscription;

  constructor(
    private TodoListS: TodoListService,
    private TodoFilterS: TodoFilterService
  ) {
    this.subscription = this.TodoListS.todoStream$.subscribe(newTodos => {
      this.todoList = newTodos;
    });
    this.todoList = this.TodoListS.getTodos();
  }

  ngOnInit(): void {
    this.addTodoForm = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit() {
    const {title} = this.addTodoForm.value;

    const newTodo = {
      id: uuidv1(),
      title,
      completed: false,
      creationDate: new Date().getTime().toString()
    };

    this.TodoListS.addTodo(newTodo);
    this.addTodoForm.reset();
  }

  public checkTodo(todoId) {
    this.TodoListS.markTodo(todoId);
  }


  public filterAll() {
    this.todoList = this.TodoListS.getTodos();
  }

  public filterCompleted() {
    this.todoList = this.TodoFilterS.filterCompleted();
  }

  public filterUncompleted() {
    this.todoList = this.TodoFilterS.filterUncompleted();
  }


}
