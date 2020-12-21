import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTodoDialogDataModel, CreateTodoModel } from './models/add-todo-dialog.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { constants } from '../../../../config/app.constants';
import { AddTodo } from '../../../../store/todos/todo.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss']
})
export class AddTodoDialogComponent implements OnInit {
  listId: string;
  
  addTodoForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    dueDateTime: new FormControl(null, [Validators.required])
  });
  constructor(private store: Store,
              private todoService: TodoService,
              private toastrService: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: AddTodoDialogDataModel,
              private dialogRef: MatDialogRef<AddTodoDialogComponent>) { }

  ngOnInit(): void {
    this.listId = this.data.listId;
  }
  
  /**
   * Function to add new todo
   */
  addTodo(listId: string) {
    if (this.addTodoForm.valid) {
      const todoToAdd: CreateTodoModel = {
        listId,
        title: this.addTodoForm.controls.title.value,
        description: this.addTodoForm.controls.description.value,
        dueDateTime: new Date(this.addTodoForm.controls.dueDateTime.value).getTime()
      };
      this.todoService.addTodo(todoToAdd).subscribe( (res) => {
        this.store.dispatch(new AddTodo(res.data));
        this.toastrService.success('Todo added successfully.', constants.toast.types.successToast);
        this.dialogRef.close();
      }, (err) => {
        this.toastrService.error('An error occurred adding todo.', constants.toast.types.errorToast);
      });
    }
    
    
    
  }

}
