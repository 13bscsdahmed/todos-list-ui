import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../../../config/api-urls.constants';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TodoModel } from '../../../store/todos/models/todo.model';
import { ApiResModel } from '../../shared/models/api-res.model';
import { UpdateTodoModel } from '../../shared/models/todos.model';

@Injectable()
export class TodoService {
  
  constructor(private http: HttpClient) { }
  
  /**
   * Function to fetch todos
   */
  fetchTodos(): Observable<ApiResModel<TodoModel[]>> {
    const urlString = apiUrls.baseUrl + apiUrls.endpoints.todos;
    return this.http.get<ApiResModel<Array<TodoModel>>>(urlString)
    .pipe(
      catchError((error: Error) => {
        return throwError(error);
      })
    );
  }
  /**
   * Function to update todo
   */
  updateTodo(todoId: string, updateBody: UpdateTodoModel): Observable<ApiResModel<TodoModel>> {
    const urlString = apiUrls.baseUrl + apiUrls.endpoints.todos + '/' + todoId;
    return this.http.put<ApiResModel<TodoModel>>(urlString, updateBody)
    .pipe(
      catchError((error: Error) => {
        return throwError(error);
      })
    );
  }
}