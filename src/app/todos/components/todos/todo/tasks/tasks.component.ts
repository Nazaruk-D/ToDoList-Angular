import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from "../../../../services/tasks.service";
import {map, Observable} from "rxjs";
import {Task} from "../../../../models/task.models";

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>
  taskTitle = ''

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    //subscribe
    this.tasks$ = this.tasksService.tasks$.pipe(map((tasks) => {
      const tasksForTodo = tasks[this.todoId]
      return tasksForTodo
    }))

    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.addTask({title: this.taskTitle, todoId: this.todoId})
    this.taskTitle = ''
  }

  removeTask(data: {todoId: string; taskId: string}) {
    this.tasksService.removeTask(data)
  }
}
