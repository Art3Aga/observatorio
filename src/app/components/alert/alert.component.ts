import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
