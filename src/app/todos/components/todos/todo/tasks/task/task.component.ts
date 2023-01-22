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
  newTitle = ''
  editMode = false

  removeTaskHandler() {
    this.removeTaskEvent.emit({todoId: this.task.todoListId, taskId: this.task.id})
  }


  activateEditModeHandler() {
    this.editMode = true
    this.newTitle = this.task.title
  }

  editTitleHandler() {
    this.changeTask({title: this.newTitle})
    this.newTitle = ''
    this.editMode = false
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.changeTask({  status: newStatus ? TaskStatusEnum.completed: TaskStatusEnum.active})
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      completed: this.task.completed,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate,
      status: this.task.status,
      title: this.task.title,
      ...patch
    }
    this.changeTaskEvent.emit({todoId: this.task.todoListId, taskId: this.task.id, model} )
  }
}

