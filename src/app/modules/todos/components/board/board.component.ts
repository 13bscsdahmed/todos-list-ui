import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListModel } from '../../../../store/list/models/list.model';
import { TodoModel } from '../../../../store/todos/models/todo.model';
import { selectAllLists } from '../../../../store/list/list.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllTodos } from '../../../../store/todos/todo.selector';
import { AddTodo, SetTodos, UpdateTodo } from '../../../../store/todos/todo.actions';
import { TodoService } from '../../services/todo.service';
import { constants } from '../../../../config/app.constants';
import { ToastrService } from 'ngx-toastr';


/**
 * Board component
 */
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
 
  lists: Array<ListModel> = [];
  todos: Array<TodoModel> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private store: Store,
              private todoService: TodoService,
              private toastrService: ToastrService,
              ) { }

  ngOnInit(): void {
    this.store.select(selectAllLists).pipe(takeUntil(this.destroy$)).subscribe((data: Array<ListModel>) => {
      this.lists = data;
    });
    this.store.select(selectAllTodos).pipe(takeUntil(this.destroy$)).subscribe((data: Array<TodoModel>) => {
      this.todos = data;
    });
    
  }
  
  /**
   * Drag start event
   */
  onDragStart(event: any, todoId: string, todoListId: string) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.setData('_id_', todoId);
    event.dataTransfer.setData('listId', todoListId);
  }
  
  /**
   * Drag over event
   */
  onDragOver(event: any) {
    event.preventDefault();
  }
  
  /**
   * Function updates todo's list on drop
   */
  updateTodoList(todoId: string, todoListId: TodoModel, dropListId: string, event: any) {
    this.todoService.updateTodo(todoId, { listId: dropListId }).subscribe( (res) => {
      this.store.dispatch(new UpdateTodo(todoId, res.data));
      event.dataTransfer.clearData();
    }, (err) => {
      this.toastrService.error('An error occurred updating list.', constants.toast.types.errorToast);
      event.dataTransfer.clearData();
    });
  }
  
  /**
   * On drop event
   */
  onDrop(event: any, dropListId: string) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    let dropzone = event.target;
    if (!event.target.parentElement.classList.contains('droppable')) {
      dropzone = event.target.parentElement;
    }
    const childToAppend = this.getDragAfterElement(dropzone, event.clientY);
  
    
    if (!childToAppend) {
      dropzone.appendChild(draggableElement);
    } else {
      dropzone.insertBefore(draggableElement, childToAppend);
    }
  
    /**
     * Update todo list logic
     */
    const todoId = event.dataTransfer.getData('_id_');
    const todoListId = event.dataTransfer.getData('listId');
    if (todoListId !== dropListId) {
      this.updateTodoList(todoId, todoListId, dropListId, event);
    } else {
      event.dataTransfer.clearData();
    }
    
  }
  
  /**
   * Function gets ref of element to drop element after
   */
  getDragAfterElement(container: any, y: number) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  
  /**
   * Get todos in list by list id
   */
  listTodos(listId: string): Array<TodoModel> {
    return this.todos.filter(todo => todo.listId === listId);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}
