import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {HttpClientModule} from "@angular/common/http";
import { TodoComponent } from './todo/todo.component';
import { IntroComponent } from './intro/intro.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {TodoFilterPipe} from '../services/todoList/todofilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    IntroComponent,
    TodoFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
