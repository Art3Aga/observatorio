import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  pathGif: string = '';

  constructor(public dialogRef: MatDialogRef<AlertComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {


    if (this.data.animationType == 'incendio') {
      this.pathGif = '../../../assets/incendio.gif';
    }
    if (this.data.animationType == 'lluvia') {
      this.pathGif = '../../../assets/rain.gif';
    }
    if (this.data.animationType == 'temperatura') {
      this.pathGif = '../../../assets/termometro.gif';
    }

  }

}
