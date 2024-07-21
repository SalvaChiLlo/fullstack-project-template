import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDto } from '@salvachll/shared/domain'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-todo',
  standalone: true,
  imports: [CommonModule, NgbAlertModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  public todo = input.required<TodoDto>()
  public onCompletedStateChange = output<boolean>()
  public onDeleteTodo = output<string>()

  changeCompletedStatus() {
    this.onCompletedStateChange.emit(!this.todo().completed)
  }

  deleteTodo() {
    this.onDeleteTodo.emit(this.todo().id)
  }
}
