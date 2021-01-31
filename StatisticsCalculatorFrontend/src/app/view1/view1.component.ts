import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})

export class View1Component {
  // Response vom Backend
  result: any;

  constructor(public dialog: MatDialog, private router: Router, public apiEndpoint: ApiEndpointService) {
  }

  onSubmit() {
    this.router.navigate(['/calculator'])
  }

  openDialog() {
    var fixData = null;
    var validationTrue = this.checkValidation();
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    if (validationTrue == true) {
      if (expl.checked == true && abs.checked == false) {
        fixData = true;
      } else if (abs.checked == true && expl.checked == false) {
        fixData = false;
      }
      const dialogRef = this.dialog.open(PopUpComponent, {
        data: { fix: fixData, absolute: [1, 2, 3, 4] }
      })  //Auffang für Daten aus dem Backend

    } else {
      const dialogRef = this.dialog.open(PopUpInvalidComponent, {
        data: {}
      }) //Auffang für Daten aus dem Backend}
    }
  }
  checkValidation() {
    var validation;
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    const valueZ = document.getElementById('valueZInput') as HTMLInputElement;
    const deviation = document.getElementById('meanDeviation') as HTMLInputElement;
    if (expl.checked == false && abs.checked == false) {
      return validation = false;
    } else if (valueZ.value.length == 0) {
      return validation = false;
    } else if (deviation.value.length == 0) {
      return validation = false;
    } else if (this.validateSequence() == false) {
      return validation = false;
    } else {
      return validation = true;
    }
  }
  validateSequence() {
    let numSeq: string = (<HTMLInputElement>document.getElementById("numSequence")).value;
    var letters = /\d*[A-Za-z\:\°\^\"\§\$\%\&\{\}\[\]\(\)\=\?\´\`\+\*\#\'\:\_\<\>\|]\d*$/;

    if (numSeq.length == 0) {
      return false;
    } else if (numSeq.match(letters)) {
      return false;
    }
    var splittedSeq = numSeq.split(";", 100)
    //var numbers = splittedSeq.match(/(?<number>\d*)/g);
    if (this.countNumbers(splittedSeq) == false) {
      return false;
    } else {
      return true;
    }
  }
  countNumbers(arraySeq: string[]) {
    let newArraySequence: { [key: string]: number } = {};

    arraySeq.forEach(function (key) {
      if (Object.keys(newArraySequence).includes(String(key))) {
        newArraySequence[key] += 1;
      }
      else {
        Object.assign(newArraySequence, { [key]: 1 });
      }
    });
    if (Math.max(...Object.values(newArraySequence)) >= 30) {
      return false;
    } else {
      return true
    }
  }
}