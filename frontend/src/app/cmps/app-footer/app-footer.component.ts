import { Component, inject, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.scss'
})
export class AppFooterComponent {
  private todoService = inject(TodoService)
  
  // Get all todos signal
  allTodos_ = this.todoService.allTodos_
  
  // Get active todos count (not completed) - computed from allTodos signal
  activeCount = computed(() => {
    const todos = this.allTodos_()
    return todos.filter(todo => !todo.isCompleted).length
  })
  
  // Get completed todos count - computed from allTodos signal
  completedCount = computed(() => {
    const todos = this.allTodos_()
    return todos.filter(todo => todo.isCompleted).length
  })

  clearCompleted(): void {
    this.todoService.clearCompleted()
  }
}
