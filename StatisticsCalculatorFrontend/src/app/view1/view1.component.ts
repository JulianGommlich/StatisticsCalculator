import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { SampleType, Stichprobe } from '../stichprobe';


@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})

export class View1Component {
  
  inputForm: FormGroup = new FormGroup ({
    numSequence: new FormControl(),
    sampleType: new FormControl(),
    valueZInput: new FormControl()
  });
  
  
  constructor(
    public dialog: MatDialog, 
    private router: Router,
  ) {}

  openDialog() {
    var fixData = null;
    var validationTrue = this.checkValidation();
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    if (validationTrue == true) {
      if (expl.checked == true && abs.checked == false) {
        fixData = true;
      } else if (expl.checked == false && abs.checked == true) {
        fixData = false;
      }
      
      let inputData = buildFormModel();
      
      const dialogRef = this.dialog.open(PopUpComponent, {
        data: { fix: true, absolute: [1,2,3,4], inputData }  //Auffang für Daten aus dem Backend
      });
    } else {
      const dialogRef = this.dialog.open(PopUpInvalidComponent, {
        data: {}
      }) //Auffang für Daten aus dem Backend}
    }
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
    
  buildFormModel() {
    let newSampleType: SampleType = this.inputForm.get('sampleType')?.value;
    let newExplSample: number[] = [];
    let newFreqDist: { [key: string]: number } = {};
    let newZ: number = this.inputForm.get('valueZInput')?.value;

    if (newSampleType == "explicit") {
      newExplSample = this.parseExplSample(this.inputForm.get('numSequence')?.value);
    }
    else if (newSampleType == "absolute"){
      newFreqDist = this.parseFreqDist(this.inputForm.get('numSequence')?.value);
    }
    
    return new Stichprobe(newSampleType, newExplSample, newFreqDist, newZ);
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
  
  // Takes a String as Input and converts it to a number-Array (explSample)
  parseExplSample(inputStr: string): number[] {
    let numArr: number[] = [];
    
    for(let key in inputStr.split(";")) {
      numArr.push(Number(inputStr.split(";")[key]));
    }
    
    return numArr;
  }

  // Takes a String as Input and converts it to a object (freqDist)
  parseFreqDist(inputStr: string): { [key: string]: number } {
    let freqDist: { [key: string]: number } = {};
    let matches = inputStr.matchAll(/\((?<value>\d*); ?(?<freq>\d*)\)/gm);

    for (let match of matches) {
      Object.assign(freqDist, { [String(match[1])]: Number(match[2])})
    }

    return freqDist;
  }
}