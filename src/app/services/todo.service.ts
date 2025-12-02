import { Injectable, signal } from '@angular/core'
import { BehaviorSubject, Observable, combineLatest } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { toSignal } from '@angular/core/rxjs-interop'
import { dummyTodos } from '../data/dummy-todos'
import { Todo, FilterBy } from '../models/todo.model'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = dummyTodos
  private todosSubject = new BehaviorSubject<Todo[]>([...this.todos])
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable()
  
  // Filter sources
  private _filterBy$ = new BehaviorSubject<FilterBy>({ isCompleted: null })
  
  // Signals
  filterBy_ = toSignal(this._filterBy$, { requireSync: true })
  allTodos_ = toSignal(this.todos$, { initialValue: [] })
  
  // Filtered todos observable
  filteredTodos$ = combineLatest([
    this.todos$,
    this._filterBy$
  ]).pipe(
    map(([todos, filterBy]) => {
      if (filterBy.isCompleted === null || filterBy.isCompleted === undefined) {
        return todos
      }
      return todos.filter(todo => todo.isCompleted === filterBy.isCompleted)
    }),
    share()
  )
  
  filteredTodos_ = toSignal(this.filteredTodos$, { initialValue: [] })
  
  constructor() {
    const todos = localStorage.getItem('todos')
    
    if (todos) {
      this.todos = JSON.parse(todos)
      this.todosSubject.next([...this.todos])
    }
  }

  getTodos(): Todo[] {
    return [...this.todos]
  }

  addTodo(title: string): Todo {
    const newTodo: Todo = {
      id: this.generateId(),
      title: title.trim(),
      isCompleted: false,
      createdAt: Date.now()
    }
    this.todos.unshift(newTodo)
    this.saveTodos()
    return newTodo
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id)
    if (index !== -1) {
      this.todos[index] = { ...updatedTodo }
      this.saveTodos()
    }
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id)
    this.saveTodos()
  }

  toggleComplete(id: string): void {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.isCompleted = !todo.isCompleted
      this.saveTodos()
    }
  }

  setFilterBy(filterBy: FilterBy): void {
    this._filterBy$.next({ ...filterBy })
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.todosSubject.next([...this.todos])
  }

  private generateId(): string {
    return 't' + Date.now().toString()
  }

}
