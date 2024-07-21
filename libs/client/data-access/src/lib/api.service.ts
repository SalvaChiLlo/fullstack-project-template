import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from '@salvachll/shared/domain';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  getAllToDoItems(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(`/api/v1/todos`);
  }

  getToDoById(todoId: string): Observable<TodoDto> {
    return this.http.get<TodoDto>(`/api/v1/todos/${todoId}`);
  }

  createToDo(todoData: CreateTodoDto): Observable<TodoDto> {
    return this.http.post<TodoDto>(`/api/v1/todos`, todoData);
  }

  updateToDo(todoId: string, todoData: UpdateTodoDto): Observable<TodoDto> {
    return this.http.patch<TodoDto>(`/api/v1/todos/${todoId}`, todoData);
  }

  createOrUpdateToDo(todoId: string, todoData: CreateTodoDto): Observable<TodoDto> {
    return this.http.put<TodoDto>(`/api/v1/todos/${todoId}`, todoData);
  }

  deleteToDo(todoId: string): Observable<TodoDto> {
    return this.http.delete<never>(`/api/v1/todos/${todoId}`);
  }
}
