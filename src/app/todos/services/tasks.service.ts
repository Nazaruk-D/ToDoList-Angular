import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {DomainTask, GetTaskResponse, Task, UpdateTaskModel} from "../models/task.models";
import {CommonResponse} from "../../core/models/core.models";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$ = new BehaviorSubject<DomainTask>({})

  constructor(private http: HttpClient) {
  }

  getTasks(todoId: string) {
    this.http
      .get<GetTaskResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe((tasks: Task[]) => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoId] = tasks
        this.tasks$.next(stateTasks)
      })
  }

  addTask(data: { todoId: string, title: string }) {
    this.http.post<CommonResponse<{item: Task}>>(`${environment.baseURL}/todo-lists/${data.todoId}/tasks`, {title: data.title})
      .pipe(map((res) => {
        const stateTasks = this.tasks$.getValue()
        const newTask = res.data.item
        const newTasks = [newTask, ...stateTasks[data.todoId]]
        stateTasks[data.todoId] = newTasks
        return stateTasks
      }))
      .subscribe((tasks) => this.tasks$.next(tasks))
  }

  removeTask(data: {todoId: string; taskId: string}) {
    this.http.delete<CommonResponse>(`${environment.baseURL}/todo-lists/${data.todoId}/tasks/${data.taskId}`)
      .pipe(map((res) => {
        const stateTasks = this.tasks$.getValue()
        const tasksForTodo = stateTasks[data.todoId]
        const filteredTasks = tasksForTodo.filter( t => t.id !== data.taskId)
        stateTasks[data.todoId] = filteredTasks
        return stateTasks
      }))
      .subscribe((tasks) => this.tasks$.next(tasks))
  }

  updateTask(data: {todoId: string; taskId: string, model: any}) {
    this.http.put<CommonResponse>(`${environment.baseURL}/todo-lists/${data.todoId}/tasks/${data.taskId}`, data.model)
      .pipe(map( () => {
        const stateTasks = this.tasks$.getValue()
        const tasksForTodo = stateTasks[data.todoId]
        const newTasks = tasksForTodo.map( t => t.id === data.taskId ? {...t, ...data.model} : t)
        stateTasks[data.todoId] = newTasks
        return stateTasks
      } ))
      .subscribe((tasks) => this.tasks$.next(tasks))
  }
}

