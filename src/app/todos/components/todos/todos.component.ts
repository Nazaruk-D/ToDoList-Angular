import {Component, OnInit} from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {Observable} from "rxjs";
import {DomainTodo} from '../../models/todos.models';
import {AuthService} from "../../../core/services/auth.service";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService, private authService: AuthService, private notificationService:NotificationService) {  }

  todos$?: Observable<DomainTodo[]>
  todoTitle = ''
  blockButton = false

  ngOnInit() {
    this.todos$ = this.todosService.todos$
    this.todosService.getTodos()
  }

  addTodoHandler() {
    if(this.todoTitle !== '') {
      this.todosService.addTodo(this.todoTitle)
      this.todoTitle = ''
    }
    this.notificationService.handleError('Enter the title')
  }

  removeTodo(todoId: string) {
    this.todosService.removeTodo(todoId)
  }

  editTodo(data: {todoId: string; title: string}) {
    this.todosService.updateTodoTitle(data)
  }

  logoutHandler() {
    this.authService.logout()
  }
}
