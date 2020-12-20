import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoModel } from '../../../../store/todos/models/todo.model';
import { AddTodo, UpdateTodo } from '../../../../store/todos/todo.actions';
import { constants } from '../../../../config/app.constants';
import { UpdateTodoModel } from '../../../shared/models/todos.model';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {
  
  todo: TodoModel;
  
  todoForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    dueDateTime: new FormControl(null, [Validators.required]),
    completionStatus: new FormControl(false, [Validators.required])
  });
  constructor(private store: Store,
              private todoService: TodoService,
              private toastrService: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: TodoModel) { }
  
  ngOnInit(): void {
    this.todo = this.data;
    this.todoForm.controls.title.setValue(this.todo.title);
    this.todoForm.controls.description.setValue(this.todo.description);
    this.todoForm.controls.completionStatus.setValue(this.todo.completionStatus);
    // @ts-ignore
    this.todoForm.controls.dueDateTime.setValue(new Date(this.todo.dueDateTime));
  }
  
  updateTodo() {
    console.log(this.todoForm.controls.completionStatus.value);
    const updateBody: UpdateTodoModel = {
      listId: this.todo.listId,
      title: this.todoForm.controls.title.value,
      description: this.todoForm.controls.description.value,
      dueDateTime: new Date(this.todoForm.controls.dueDateTime.value).getTime(),
      completionStatus: this.todoForm.controls.completionStatus.value,
    };
    this.todoService.updateTodo(this.todo._id_, updateBody).subscribe( (res) => {
      this.store.dispatch(new UpdateTodo(this.todo._id_, res.data));
    }, (err) => {
      this.toastrService.error('An error occurred adding todo.', constants.toast.types.errorToast);
    });
  }

}
