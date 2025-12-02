import { Component, inject, Signal } from '@angular/core'
import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/todo.model'

@Component({
  selector: 'todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  private todoService = inject(TodoService)
  todos: Signal<Todo[]> = this.todoService.filteredTodos_
}
