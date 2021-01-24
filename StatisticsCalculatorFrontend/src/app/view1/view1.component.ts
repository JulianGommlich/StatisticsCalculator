import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})

export class View1Component {
  constructor(public dialog: MatDialog) {

  }

  openDialog() {
    console.log("test");
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: { fix: false, absolute: [1,2,3,4] }  //Auffang für Daten aus dem Backend
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}