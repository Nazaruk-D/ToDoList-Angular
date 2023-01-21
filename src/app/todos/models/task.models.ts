export interface GetTaskResponse {
  items: Task[]
  totalCount: number
  error: string
}

export interface Task {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export interface DomainTask {
  [key: string]: Task[]
}
