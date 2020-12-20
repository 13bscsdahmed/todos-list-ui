import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Store } from '@ngrx/store';
import { UpdateTodo } from '../../../../store/todos/todo.actions';
import { constants } from '../../../../config/app.constants';
import { AddList } from '../../../../store/list/list.actions';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss']
})
export class AddListDialogComponent implements OnInit {
  listForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });
  constructor(private listService: ListService,
              private store: Store,
              private toastrService: ToastrService,
              private dialogRef: MatDialogRef<AddListDialogComponent>) { }
  ngOnInit(): void {
  }
  
  /**
   * Function to create new list
   */
  addList() {
    if (this.listForm.valid) {
      this.listService.addList({ title: this.listForm.controls.title.value }).subscribe( (res) => {
        this.store.dispatch(new AddList(res.data));
        this.toastrService.success('List added successfully.', constants.toast.types.successToast);
        this.dialogRef.close();
      }, (err) => {
        this.toastrService.error('An error occurred adding list.', constants.toast.types.errorToast);
      });
    }
  }

}
