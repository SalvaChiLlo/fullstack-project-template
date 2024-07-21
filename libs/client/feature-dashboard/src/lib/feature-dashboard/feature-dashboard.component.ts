import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@salvachll/client/data-access'
import { TodoComponent } from '@salvachll/client/ui-components'
import { TodoDto } from '@salvachll/shared/domain';
import * as _ from 'lodash'
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'lib-feature-dashboard',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './feature-dashboard.component.html',
  styleUrl: './feature-dashboard.component.scss',
})
export class FeatureDashboardComponent {
  private readonly apiService = inject(ApiService);

  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  todoItems$: Observable<TodoDto[]> = this.refreshTrigger$.pipe(
    switchMap(() => this.apiService.getAllToDoItems())
  );

  updateTodoStatus(todo: TodoDto, completed: boolean) {
    this.apiService.updateToDo(todo.id, _.merge(todo, { completed })).subscribe({
      next: () => this.refreshTrigger$.next(),
      error: (err) => console.error('Update failed', err),
    })
  }

  deleteTodo(todo: TodoDto, id: string) {
    this.apiService.deleteToDo(todo.id).subscribe({
      next: () => this.refreshTrigger$.next(),
      error: (err) => console.error('Delete failed', err),
    })
  }
}
