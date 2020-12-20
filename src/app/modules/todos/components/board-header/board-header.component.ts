import { Component, OnInit } from '@angular/core';
import { AddListDialogComponent } from '../../dialogs/add-list-dialog/add-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  onOpenDialog() {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      closeOnNavigation: true,
      disableClose: false,
      hasBackdrop: true,
    });
    return dialogRef;
  }

}
