import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, UpdateTaskModel} from "../../../../../models/task.models";
import {TaskStatusEnum} from "../../../../../../core/enums/taskStatus.enum";

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{todoId: string, taskId: string; }>()
  @Output() changeTaskEvent = new EventEmitter<{todoId: string, taskId: string; model: UpdateTaskModel }>()

  taskStatusEnum = TaskStatusEnum

  removeTaskHandler() {
    this.removeTaskEvent.emit({todoId: this.task.todoListId, taskId: this.task.id})
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    const model: UpdateTaskModel = {
      status: newStatus ? TaskStatusEnum.completed: TaskStatusEnum.active,
      title: this.task.title,
      completed: this.task.completed,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate
    }
    this.changeTaskEvent.emit({todoId: this.task.todoListId, taskId: this.task.id, model} )
  }
}

