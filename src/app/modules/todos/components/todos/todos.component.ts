import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SetLists } from '../../../../store/list/list.actions';
import { SetTodos } from '../../../../store/todos/todo.actions';
import { constants } from '../../../../config/app.constants';
import { ListService } from '../../services/list.service';
import { TodoService } from '../../services/todo.service';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

/**
 * Dairy module container component
 */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(private listService: ListService,
              private todoService: TodoService,
              private store: Store,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    forkJoin([this.listService.fetchLists(), this.todoService.fetchTodos()])
    .subscribe( (res) => {
      this.store.dispatch(new SetLists(res[0].data));
      this.store.dispatch(new SetTodos(res[1].data));
    }, (err) => {
      this.toastrService.error('An error occurred fetching data.', constants.toast.types.errorToast);
    });
  }

}
