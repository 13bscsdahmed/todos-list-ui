import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NoteModel } from '../../../../store/notes/models/note.model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { selectAllNotes, selectNotesByDate } from '../../../../store/notes/notes.selectors';

import { json2csv } from 'json-2-csv';
import { ToastrService } from 'ngx-toastr';

import { FileSaverUtils } from '../../../shared/utils/file-saver/file-saver.utils';
import { fileSaverConstants } from '../../../shared/utils/file-saver/file-saver.constants';
import { constants } from '../../../../config/app.constants';


/**
 * Notes history component. Shows all the past notes
 */
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  
  historyForm = new FormGroup({
    date: new FormControl(''),
  });
  notes: Array<NoteModel> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private store: Store,
              private toastrService: ToastrService) { }
  
  ngOnInit(): void {
    this.getNotes('');
  }
  
  /**
   * Function to reset
   */
  reset() {
    // Reset form
    this.historyForm.controls.date.setValue('');
    this.getNotes(this.historyForm.controls.date.value);
  }
  
  /**
   * Function to fetch notes based on date
   * @param date - Date of which to fetch notes of
   */
  getNotes(date: string) {
    if (date === '' || null) {
      this.store.select(selectAllNotes).pipe(takeUntil(this.destroy$)).subscribe((data: Array<NoteModel>) => {
        this.notes = data;
      });
    } else {
      this.store.select(selectNotesByDate(date)).pipe(takeUntil(this.destroy$)).subscribe((data: Array<NoteModel>) => {
        this.notes = data;
      });
    }
  }
  
  /**
   * Function to download the csv file
   */
  getCsv() {
    const filename = this.historyForm.controls.date.value === '' ? 'all-notes.csv' : `${this.historyForm.controls.date.value.toString()}-notes.csv`;
    json2csv(this.notes, (err, csv) => {
      if (csv) {
        FileSaverUtils.downloadFile(csv, filename, fileSaverConstants.fileTypes.csv);
      } else {
        this.toastrService.error('An error occurred exporting date.', constants.toast.types.errorToast);
      }
    }, {});
  }
  
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
