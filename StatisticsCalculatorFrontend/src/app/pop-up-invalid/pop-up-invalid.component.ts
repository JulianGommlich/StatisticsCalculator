import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-invalid',
  templateUrl: './pop-up-invalid.component.html',
  styleUrls: ['./pop-up-invalid.component.css', '../app.component.css']
})
export class PopUpInvalidComponent {

  // caseIsForm: boolean;
  errorCase: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { case: string },) { 
    // if (data.case === 'pop-up') {
    //   this.caseIsForm = false;
    // } else if (data.case === 'form') {
    //   this.caseIsForm = true;
    // }
    this.errorCase = data.case;
  }
}
