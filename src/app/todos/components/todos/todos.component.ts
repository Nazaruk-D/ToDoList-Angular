import {Component, OnInit} from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {Observable} from "rxjs";
import {Todo} from '../../models/todos.models';

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {
  }

  todos$?: Observable<Todo[]>
  todoTitle = ''

  ngOnInit() {
    //subs
    this.todos$ = this.todosService.todos$
    this.todosService.getTodos()
  }

  addTodoHandler() {
    this.todosService.addTodo(this.todoTitle)
    this.todoTitle = ''
  }

  removeTodo(todoId: string) {
    this.todosService.removeTodo(todoId)
  }
}
