import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoModel } from '../../../../store/todos/models/todo.model';
import { UpdateTodo } from '../../../../store/todos/todo.actions';
import { constants } from '../../../../config/app.constants';
import { UpdateTodoModel } from '../../../shared/models/todos.model';
import { apiUrls } from '../../../../config/api-urls.constants';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {
  
  todo: TodoModel;
  file: File;
  extensionError = false;
  apiUrls = apiUrls;
  
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
  
  /**
   * Update todo function
   */
  updateTodo() {
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
      this.toastrService.error('An error occurred updating todo.', constants.toast.types.errorToast);
    });
  }
  
  /**
   * Function sets model value to the file uploaded
   *  @Param event: $event
   * returns null
   */
  addFile(event: any) {
    this.file = event.target.files[0];
    const extension = this.file.name.substr(this.file.name.lastIndexOf('.'), this.file.name.length);
    if ( extension === '.png' || extension === '.jpg' || extension === '.jpeg' ) {
      this.todoService.uploadAttachment(this.todo._id_, this.file).subscribe( (res) => {
        this.store.dispatch(new UpdateTodo(this.todo._id_, res.data));
        this.todo.attachments = res.data.attachments;
      }, (err) => {
        this.toastrService.error('An error occurred uploading attachment.', constants.toast.types.errorToast);
      });
    } else {
      this.extensionError = true;
    }
  }
  
  /**
   * Opens image in new tab
   */
  openImage(link: string) {
    window.open(link, '_blank');
  }

}
