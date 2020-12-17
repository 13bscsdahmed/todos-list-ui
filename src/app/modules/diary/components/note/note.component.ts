import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteModel } from '../../../../store/notes/models/note.model';
import { Store } from '@ngrx/store';
import { AddNote } from '../../../../store/notes/notes.actions';
import { Subject } from 'rxjs';

import { UUID } from 'angular2-uuid';
import { AppUtils } from '../../../shared/utils/app.utils';
import { ValidatorUtil } from '../../../shared/utils/validator.utils';
import { ToastrService } from 'ngx-toastr';
import { constants } from '../../../../config/app.constants';


/**
 * Component to add new notes
 */
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  noteForm = new FormGroup({
    note: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required, ValidatorUtil.urlValidator]),
    video: new FormControl('', [Validators.required, ValidatorUtil.urlValidator])
  });
  note: NoteModel = this.getDefaultNoteValue();
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private store: Store,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
  }
  
  /**
   * Function returns default note value
   */
  getDefaultNoteValue(): NoteModel {
    return {
      id: '',
      text: '',
      date: '',
      picture: '',
      video: '',
      timestamp: ''
    };
  }
  
  /**
   * Function to add note
   */
  addNote() {
    if (this.noteForm.valid) {
      this.note = {
        id: UUID.UUID(),
        text: this.noteForm.value.note,
        date: this.noteForm.value.date.toString() || '',
        picture: this.noteForm.value.picture,
        video: this.noteForm.value.video,
        timestamp: AppUtils.getDateTimeString(new Date())
      };
      
      // Dispatch action to add note. Make a service call in case of an http call
      this.store.dispatch(new AddNote(this.note));
      
      // Reset form
      this.noteForm.reset();
  
      // Mark all fields as pristine to remove validation errors
      (Object as any).values(this.noteForm.controls).forEach(
        (control: any) => {
          control.markAsPristine();
        });
      this.note = this.getDefaultNoteValue();
      this.toastrService.success('Note added successfully.', constants.toast.types.successToast);
    }
  }
  
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}
