import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Store } from '@ngrx/store';
import { UpdateTodo } from '../../../../store/todos/todo.actions';
import { constants } from '../../../../config/app.constants';
import { AddList } from '../../../../store/list/list.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss']
})
export class AddListDialogComponent implements OnInit {
  title = '';
  constructor(private listService: ListService,
              private store: Store,
              private toastrService: ToastrService) { }
  ngOnInit(): void {
  }
  
  /**
   * Function to create new list
   */
  addList() {
    if (this.title && this.title !== '') {
      this.listService.addList({ title: this.title }).subscribe( (res) => {
        this.store.dispatch(new AddList(res.data));
      }, (err) => {
        this.toastrService.error('An error occurred adding list.', constants.toast.types.errorToast);
      });
    }
  }

}
