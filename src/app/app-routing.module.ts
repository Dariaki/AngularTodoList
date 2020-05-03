import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from "./todo/todo.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {IntroComponent} from "./intro/intro.component";

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    pathMatch: 'full'
  },
  {
    path: 'todos/:id',
    component: TodoComponent
  },
  {
    path: 'todos',
    component: TodoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
