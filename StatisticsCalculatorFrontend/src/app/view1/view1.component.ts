import { Component, OnInit } from '@angular/core';
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
    
    let inputData = new Stichprobe(newSampleType, newExplSample, newFreqDist, newZ);
    
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: { fix: true, absolute: [1,2,3,4], inputData }  //Auffang für Daten aus dem Backend
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Takes a String as Input and converts it to a number-Array (explSample)
  parseExplSample(inputStr: String): number[] {
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