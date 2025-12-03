import { Component, inject, Signal, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterBy } from '../../models/todo.model';

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
  
  // Get current filter
  filterBy_: Signal<FilterBy> = this.todoService.filterBy_

  setFilter(filterType: 'all' | 'active' | 'completed'): void {
    const filterBy: FilterBy = 
      filterType === 'all' 
        ? { isCompleted: null }
        : { isCompleted: filterType === 'completed' }
    this.todoService.setFilterBy(filterBy)
  }

  isActive(filterType: 'all' | 'active' | 'completed'): boolean {
    const currentFilter = this.filterBy_()
    if (filterType === 'all') {
      return currentFilter.isCompleted === null || currentFilter.isCompleted === undefined
    }
    return currentFilter.isCompleted === (filterType === 'completed')
  }

  clearCompleted(): void {
    this.todoService.clearCompleted()
  }
}
